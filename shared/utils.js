const chars = 'abcdefghijklmnopqrstuvwxyz'

const getId = () => {
  let result = ''
  for (let i = 0; i < 5; i++) {
    result += chars[Math.floor(Math.random() * 26)]
  }
  return result
}

const initialQuestionForm = () => ({
  question_title: '', question_text: '',
  options: {
    [getId()]: { option_text: '', is_correct: true, remark: '' },
    [getId()]: { option_text: '', is_correct: false, remark: '' },
  }
})

module.exports = {
  getId,
  initialQuestionForm,
}
