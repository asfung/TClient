
export const useColorTheme = () => {

  const setColor = (newTheme) => {
    useColorMode().preference = newTheme;
  }

  return {
    setColor,
  }

}