import { CardWrapper } from "./card-wrapper"



export const LoginFrom = () => {
  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backButtonLabel="Don't hava an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      Login form
    </CardWrapper>
  )
}