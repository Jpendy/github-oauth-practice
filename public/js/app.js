const root = document.getElementById('root')

fetch('/api/v1/auth/verify')
    .then(res => {
        if (res.ok) return res.json()
        throw new Error('Not Logged In')
    })
    .then(({ username, photoUrl }) => {
        const logout = document.createElement('button')
        const name = document.createElement('h3')
        const image = document.createElement('img')

        image.style.width = '150px'
        image.style.borderRadius = '50%'
        image.src = photoUrl
        name.textContent = username;

        logout.textContent = 'Logout'
        logout.addEventListener('click', () => window.location.href = '/api/v1/auth/logout')
        root.append(image, name, logout)
    })
    .catch((err) => {
        console.error(err)

        const githubLoginButton = document.createElement('button')
        const googleLoginButton = document.createElement('button')

        googleLoginButton.textContent = 'Login with Google'
        githubLoginButton.textContent = 'Login with GitHub'
        githubLoginButton.addEventListener('click', () => window.location.href = '/api/v1/auth/github-login')
        googleLoginButton.addEventListener('click', () => window.location.href = '/api/v1/auth/google-login')

        root.append(githubLoginButton, googleLoginButton)
    })

