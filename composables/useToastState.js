export const useToastState = () => {
  const visible = useState('toast-visible', () => false)
  const message = useState('toast-message', () => '')
  const color = useState('toast-color', () => 'info')
  const actionLabel = useState('toast-label', () => null)
  const onAction = useState('toast-action', () => null)

  const showToast = ({ message: msg, color: col = 'info', actionLabel: label = null, onAction: action = null }) => {
    message.value = msg
    color.value = col
    actionLabel.value = label
    onAction.value = action
    visible.value = true
  }

  const hideToast = () => {
    visible.value = false
  }

  const triggerAction = () => {
    if (typeof onAction.value === 'function') {
      onAction.value()
    }
    hideToast()
  }

  return {
    visible,
    message,
    color,
    actionLabel,
    onAction,
    showToast,
    hideToast,
    triggerAction,
  }
}
