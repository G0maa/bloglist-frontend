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
  - do deployment as learned in `part3`
- Deployed link: https://part7bloglist.herokuapp.com/
- Want to play?
  - Try for username: `gomaa` password `security`
  - or username: `root` password `secret` or `sekret`
- [Main repo link](https://github.com/OoMiDOoO/FullstackOpen), I can't submit many repos to the system so files of this repo will be copied there eventually.
- P.S: I had a `.git` renamed to `git_folder` and `.gitignore`ed, so you might see more commits than in the main repo...

- Actual to-dos:
  - Hide 'create new blog' form after submitting a new blog (and make it toggleable): ✅
  - Check if `Prerttier` actually works "automatically".
  - Group forms in a single hook
  - Are there a better way for error handling for ReactJS other than `try catch`?
  - Fix refreshing URL of `/X/:id` will not work: ✅
  - Renaming of some-functions (services/reducers)
  - Reduxifiying `SubmitForm` and `LoginForm`:
    - Need to `navigate` to other routes when both have successful execution only, using native react `useState()` that seems to be not possible.

- Actual self-notes:
  - In some (all?) cases I decided to group related components together than separating them into their respective files.
  - You don't have to specify which property of the state you are changing in the reducers, e.g. you have `notification` and `blogs` in your `store`... this may need further investigation though :)
```JS
// This will not work
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
- Redux Toolkit creates some vague code:
  - You don't know how the state looks like from the code, unless you explicitly type some form of it in the initial state, which isn't correct, or comment it out.
  - You don't exactly know how the reducers change state if you `return action.payload`
  - You lean on the service for returning back a corectly formatted object.
    - If you have two "kinds" of the API, one summary and one detailed, if not formatted early, you will be in a situation where you have "two-states" in side of one state, aka... one detailed blog, and one summerized blog in our app at least... which is I suppose confusing.
- Actual mapping of Blogs to Users wouldn't be _that_ hard, and it means less request(s).
  - Which is better?
  - Scratched that idea off when I thought of all the work one would have to do if data changed in one place.
- You can't get to a specific user details without going to /users first, I guess that _kinda_ logical?
  - At least it should work when you do a refresh?
  - I was trying to save populate `blogs =[]` of each user when call to `/users/:id`, I didn't quite get it to work, so I switched to full monkey mode and created `queryUser` state, that saves state of each new query-ed user, now... there's no cache what-so-ever.
- (backend & frontend) about non-reflected modifications of object properties:
  - 1. Think of the returned type 🤷🏻‍♂️
  - `Mongooose.save()` returns welp.. some kind of object, modifying using that object's schema properties _might not_ result in the intended output... you may access the acutal object through `obj._doc`
  - I made a terrible mistake, which cost(ed) me lots of time, tl;dr I didn't know how `array.filter()` actually works.
- A decision:
  - `fetchAllUsers()` and `fetchAllBlogs()`, which are the two main routes, are executed in `app` instead of their designated erm.. components, this was due to `useEffect` being executed in a different order... i.e. I will need to implement more logic to deal with refresh the website to `/users/:id` and `/blogs/:id` of which I decided to just skip.
