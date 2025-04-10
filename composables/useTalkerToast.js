import { useToastState } from "~/composables/useToastState"

export const useTalkerToast = () => {
	const { showToast } = useToastState()
	return showToast
}