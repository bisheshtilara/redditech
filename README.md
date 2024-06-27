<h1>Redditech</h1>

<h2>User Documentation</h2>
<h4>Redditech is a browsing app for Reddit. All your everyday reddit things combined into a simple and pleasent experience in this app.</h3>
<h5>The UX/UI of Redditch is very simple and stright forward.</h5>
<h4>SignIn</h4>
  <h5>To use the Redditech app you must sign in with your Reddit account.</h5>
  <img width="357" alt="signin" src="https://user-images.githubusercontent.com/90610832/158062934-bc485487-83eb-4506-bb43-f3b8bca3412f.png">
  <h5>Simply click the Signin button, signin with your reddit account and you're good to go.</h5>
<h4>Home Feed<h5>
  <h5>Once you are signed in, you can enjoy your reddit homefeed</h5>
  <img width="360" alt="homefeed" src="https://user-images.githubusercontent.com/90610832/158063642-70a31949-1305-4ec6-ad59-17f0f26e7b04.png">
<h4>Subscribed Subreddits</h4>
  <h5>You can touch the menu icon on the top left of your homefeed to view all the subreddits you are subscribed to.</h5>
 <img width="359" alt="subscribed" src="https://user-images.githubusercontent.com/90610832/158064102-2f8b6df3-acb6-42e1-a6ab-603ac3eb5f10.png">
  <h5>You can simply navigate to a subreddit in your subscribed subreddits by simply touching it.</h5>
<h4>Search</h4>
  <h5>You can touch the search bar at the top in the homefeed to open the search menu.</h5>
  <h5>In the search menu, you can dynamically search for any subreddit you are looking for</h5>
  <img width="362" alt="search" src="https://user-images.githubusercontent.com/90610832/158064178-f33f2ba5-2ccb-4ce9-8e49-7843b1ece30a.png">
  <h5>Once you find the subreddit you are looking for, simply touch it to navigate to that subreddit</h5>
<h4>Profile</h4>
  <h5>You can touch your profile icon on the top right of your homefeed to view your profile information. </h5>
  <img width="362" alt="profile" src="https://user-images.githubusercontent.com/90610832/158064286-1a9f3417-ce38-441d-bafa-977a6d4aa3f3.png">
  <h5>Touching My Profile will navigate you to your profile page, where you can see your profile and you submissions to reddit.</h5>
  <img width="361" alt="myprofile" src="https://user-images.githubusercontent.com/90610832/158065403-7106bf62-4255-458c-b332-f3246ea785f5.png">
  <h5>Touching Saved will navigate you to your saved posts.</h5>
  <img width="362" alt="saved" src="https://user-images.githubusercontent.com/90610832/158079542-b05aad8e-de6f-44e3-b56b-b8efcf959b85.png">
  <h5>Touching Settings will navigate you to your settings, where you can change your settings with ease. </h5>
  <img width="362" alt="settings" src="https://user-images.githubusercontent.com/90610832/158065606-8a5ec37d-e441-4c8a-b9ba-728542c8d2f3.png">
  <h5>Simply touch Save Changes to save your changed settings.</h5>
<h4>Subreddit</h4>
  <img width="360" alt="subreddit" src="https://user-images.githubusercontent.com/90610832/158065899-21a29299-925f-43c3-8793-92dbc3724b9d.png">
  <h5>You can view all the posts from the subreddit you have navigated to. You can also join or leave a subreddit by touching the respective button next to the name of the subreddit.</h5>  
<h4>Filter</h4>  
  <h5>You can filter posts on your homefeed, any subreddit and your submissions by using the filter bar, simply touch the filter you want to apply.</h5>
  <img width="361" alt="filter" src="https://user-images.githubusercontent.com/90610832/158065756-b7feada8-8078-4d94-bfc0-d431391c0440.png">
<h4>Posts</h4>
  <h5>You can Upvote, Downvote or remove a vote from a post by touching their respective icons.</h5>
  <h5>You can also save a post by touching the save icon on the post.</h5>
  <img width="362" alt="posts" src="https://user-images.githubusercontent.com/90610832/158066073-5130b55e-16c0-4c99-b75a-2edd370a1c6f.png">

  
<h2>Developer Documentation</h2>
  <h3>Tech Stack:</h3>
  <h4>React Native, React Native Elements, Tailwind CSS, Redux</h4>
  
  <h5>Sign in is done using OAuth2</h5>
  
  <img width="676" alt="signin" src="https://user-images.githubusercontent.com/90610832/158066361-6919abed-502e-4da8-9495-8267aa241b23.png">
  
  <h5>The Authentication token is stored in redux store to be able to access it throughout the app to make multiple api calls.</h5>
  <img width="475" alt="signinFunc" src="https://user-images.githubusercontent.com/90610832/158066528-78b470d1-0d8d-494c-937d-92282a012fec.png">
  <img width="608" alt="authredux" src="https://user-images.githubusercontent.com/90610832/158066531-016bbcf4-39c7-447f-af2d-9196f04c1b70.png">

  <h5>For pagination, after attribute of reddit api's listing was used to get all the data and then paginate it.</h5>
  <img width="680" alt="pagination" src="https://user-images.githubusercontent.com/90610832/158066587-3011a06f-c1ff-4e38-be61-dc8c06af63f7.png">
  
  <h5>Filters are make by objects with value as a key to use it to make api calls to get the filtered posts.</h5>
  <img width="303" alt="filters" src="https://user-images.githubusercontent.com/90610832/158066735-7f9d301c-b41c-4a96-9226-0ea38bd709ad.png">
  <img width="662" alt="filterCall" src="https://user-images.githubusercontent.com/90610832/158066833-dfe926d0-9e07-4e5b-89b3-680467ef20a8.png">

  <h5>Flatlist is used to display the posts from the data fetched from the reddit api.</h5>
  <img width="353" alt="flatlist" src="https://user-images.githubusercontent.com/90610832/158066897-8a52b35e-7d99-4e8b-8c63-52ce08d12b54.png">
  
  <h5>Settings are changed by making a Patch request to the reddit api with a JSON body of the changes.</h5>
  <img width="480" alt="settings" src="https://user-images.githubusercontent.com/90610832/158066944-51226787-6880-46a8-afa2-8a8fb71ce57c.png">

  <h5>Upvote and Downvote functionality makes use of the reddit api by making a post request with the name and the direction of the vote as a query to the api call.</h5>
  <img width="583" alt="upvote" src="https://user-images.githubusercontent.com/90610832/158067006-334c164b-769f-44ba-9024-544448c67308.png">
  
  <h5>Saving or unsaving a post functionality makes use of the reddit api by making a post request with the name and save or unsave option as a query to the api call.</h5>
  <img width="699" alt="savepost" src="https://user-images.githubusercontent.com/90610832/158067102-e61aed88-dfde-447a-8311-02161175dc3d.png">

  <h5>Subscribing or unscribing a subreddit functionality makes use of the reddit api by making a post request the the name of the subreddit and the option to sub or unsub as a query to the api call.</h5>
  <img width="582" alt="join" src="https://user-images.githubusercontent.com/90610832/158068271-70e353ec-2180-4bde-aff2-a8327f6e2f37.png">

  <h5>The redux slices is well named for all the data that needs to be accessible throughout the app to make api calls in one place for a specific needs. That makes the code cleaner and optimized.</h5>
  <img width="250" alt="redux" src="https://user-images.githubusercontent.com/90610832/158068393-22d0163b-2832-4e8d-87c4-35a4ce8239ca.png">

 <h5>Postman was a very important part of this project. It was clear to understand the api itself as well as the structure of the data provided.</h5>
  <img width="1119" alt="postman_saved" src="https://user-images.githubusercontent.com/90610832/158068477-42f90e21-0059-4f9b-9c13-28a576fa9b6d.png">

 <h5>Postman was also very handy in making patch or post requests to check the output for example, changing settings or saving a post or upvoting a post.</h5>
  <img width="1116" alt="postman_upvote" src="https://user-images.githubusercontent.com/90610832/158068543-7f5fd475-29b0-4e3e-a60d-d2788b39e557.png">

  <h4>TLDR..... Redditech is a reddit browser app made with React Native by Hien & Bishesh 💫</h2>
  
  

