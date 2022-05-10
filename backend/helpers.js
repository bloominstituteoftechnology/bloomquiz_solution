const yup = require('yup')
const jwt = require('jsonwebtoken')

const thisShouldBeSecret = 'shh'
const topics = ['JavaScript', 'React', 'Node']

let id, articles, getId

const st = {
  closuresTitle: 'The Truth about Closures',
  closuresText: 'Closures exist in some languages',
  closuresTopic: topics[0],

  hooksTitle: 'Mastering Hooks',
  hooksText: 'Prepare to read the docs',
  hooksTopic: topics[1],

  expressTitle: 'The Express Library',
  expressText: 'Express is the Sinatra',
  expressTopic: topics[2],
}

const reset = () => {
  id = 0
  getId = () => ++id
  articles = [
    {
      article_id: getId(),
      title: st.closuresTitle,
      text: st.closuresText,
      topic: st.closuresTopic,
    },
    {
      article_id: getId(),
      title: st.hooksTitle,
      text: st.hooksText,
      topic: st.hooksTopic,
    },
    {
      article_id: getId(),
      title: st.expressTitle,
      text: st.expressText,
      topic: st.expressTopic,
    },
  ]
}
reset()

const userSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required('username is required')
    .min(3, 'username must be at least 3 characters long')
    .max(20, 'username must be at most 20 characters long'),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'password must be at least 8 characters long')
    .max(20, 'password must be at most 20 characters long'),
})
const articleSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('title is required')
    .min(1, 'title must be at least one characters long')
    .max(50, 'title must be at most 50 characters long'),
  text: yup
    .string()
    .trim()
    .required('text is required')
    .min(1, 'text must be at least one character long')
    .max(200, 'text must be at most 200 characters long'),
  topic: yup
    .string()
    .required('topic is required')
    .oneOf(topics)
})

async function login(user) {
  try {
    const { username } = await userSchema.validate(user)
    const claims = {
      username,
      role: 'Learner',
      school: 'Bloomtech',
    }
    const token = jwt.sign(claims, thisShouldBeSecret, { expiresIn: '1h' })
    const payload = { message: `Welcome back, ${username}!`, token }
    return [200, payload]
  } catch (err) {
    return [422, { message: `Ouch: ${err.message}` }]
  }
}

async function checkToken(token) {
  return jwt.verify(token, thisShouldBeSecret)
}

async function getArticles(token) {
  try {
    const decodedToken = await checkToken(token)
    const payload = {
      message: `Here are your articles, ${decodedToken.username}!`,
      articles,
    }
    return [200, payload]
  } catch (err) {
    return [401, { message: `Ouch: ${err.message}` }]
  }
}

async function postArticle(token, article) {
  let decodedToken, validatedArticle, newArticle
  try {
    decodedToken = await checkToken(token)
  } catch (err) {
    return [401, { message: `Ouch: ${err.message}` }]
  }
  try {
    validatedArticle = await articleSchema.validate(article, { stripUnknown: true })
    newArticle = { article_id: getId(), ...validatedArticle }
    articles.push(newArticle)
  } catch (err) {
    return [422, { message: `Ouch: ${err.message}` }]
  }
  const payload = {
    message: `Well done, ${decodedToken.username}. Great article!`,
    article: newArticle,
  }
  return [201, payload]
}

async function updateArticle(token, article, article_id) {
  let decodedToken, validatedArticle
  try {
    decodedToken = await checkToken(token)
  } catch (err) {
    return [401, { message: `Ouch: ${err.message}` }]
  }
  if (!articles.find(art => art.article_id == article_id)) {
    return [404, { message: `Ouch: Article with article_id ${article_id} does not seem to exist!` }]
  }
  try {
    validatedArticle = await articleSchema.validate(article, { stripUnknown: true })
  } catch (err) {
    return [422, { message: `Ouch: ${err.message}` }]
  }
  articles = articles.map(art => {
    return art.article_id == article_id ? { ...art, ...validatedArticle } : art
  })
  const payload = {
    message: `Nice update, ${decodedToken.username}!`,
    article: articles.find(art => art.article_id == article_id),
  }
  return [200, payload]
}

async function deleteArticle(token, article_id) {
  let decodedToken
  try {
    decodedToken = await checkToken(token)
  } catch (err) {
    return [401, { message: `Ouch: ${err.message}` }]
  }
  if (!articles.find(art => art.article_id == article_id)) {
    return [404, { message: `Ouch: Article with article_id ${article_id} does not seem to exist!` }]
  }
  articles = articles.filter(art => {
    return art.article_id != article_id
  })
  const payload = {
    message: `Article ${article_id} was deleted, ${decodedToken.username}!`,
  }
  return [200, payload]
}

module.exports = {
  login,
  postArticle,
  getArticles,
  updateArticle,
  deleteArticle,
  reset,
  st,
}
