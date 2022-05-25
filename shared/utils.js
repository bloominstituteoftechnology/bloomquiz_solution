const { nanoid } = require('nanoid')

const getId = () => nanoid().slice(0, 5)

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
