import { Middleware } from "@nuxt/types";

const guest: Middleware = ({$auth, redirect}) => {
    if ($auth.loggedIn) {
        return redirect('/home')
    }
}

export default guest
