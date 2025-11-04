authrouter

POST  /signup
POST /login
POST /logout

profile router
GET /profile/view
Patch /profile/edit
Patch profile/password

connectionrequest
post /request/send/interested/:userId
post /request/send/ignored/:userId
post /request/review/accepted/:requestId
post /request/review/rejected/:requestId

userrouter
GET /users/connections
GET /users/requests
GET /users/feed