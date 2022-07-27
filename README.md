- Current progress: `nothing-done`, the link is an initial deployment.
- This is where I made forntend related excercises of `part7` of `FullstackOpen 2022`, keep in mind, this frontend repo had the starting code found [here](https://github.com/fullstack-hy2020/bloglist-frontend).
- Tech stack: `MERN`.
  - Deployment: `Heroku`,
  - Database: `cloud.mongodb.com`
  - state management: `Redux Toolkit`
  - testing:
    - Unit tests: `Jest`
    - Integration tests (API Tests): `Jest and Supertest`
    - E2E testing: `Cypress`
- Optional to-do:
  - Use third party UI framework as learned in `part7`
  - do Tests as learned in `part5`
  - do do deployment as learned in `part3`
- Deployed link: https://part7bloglist.herokuapp.com/
- Want to play?
  - Try for username: `gomaa` password `security`
  - or username: `root` password `secret` or `sekret`
- [Main repo link](https://github.com/OoMiDOoO/FullstackOpen), I can't submit many repos to the system so files of this repo will be copied there eventually.
- P.S: I had a `.git` renamed to `git_folder` and `.gitignore`ed, so you might see more commits than in the main repo...

- Actual to-dos:
  - Hide 'create new blog' form after submitting a new blog (and make it toggleable)
  - Check if `Prerttier` actually works "automatically".
  - Group forms in a single hook
  - Are there a better way for error handling for ReactJS other than `try catch`?

- Actual self-notes:
  - You don't have to specify which property of the state you are changing in the reducers, e.g. you have `notification` and `blogs` in your `store`... this may need further investigation though :)
```JS
// You don'tt have to do this:
setNotification(state, action) {
  const notificationState = state.notification
  // remaining logic
}
// You can directly do this:
setNotification(state, action) {
  return {
    message: action.payload,
    type: 'normal',
  }
}
```
