let mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment")
 
let data = [
  {
    name: "Cloud's Rest", 
    image: "https://source.unsplash.com/collection/142631/random",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in vestibulum erat. Nullam vulputate, quam a pretium eleifend, nisi massa auctor risus, non finibus augue lorem vel quam. Vestibulum id sapien justo. Maecenas lobortis sagittis consequat. Duis mi ipsum, blandit sit amet venenatis quis, rhoncus vitae ex. Interdum et malesuada fames ac ante ipsum primis in faucibus."
  },
  {
    name: "Desert Mesa", 
    image: "https://source.unsplash.com/collection/254504/random",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in vestibulum erat. Nullam vulputate, quam a pretium eleifend, nisi massa auctor risus, non finibus augue lorem vel quam. Vestibulum id sapien justo. Maecenas lobortis sagittis consequat. Duis mi ipsum, blandit sit amet venenatis quis, rhoncus vitae ex. Interdum et malesuada fames ac ante ipsum primis in faucibus."
  },
  {
    name: "Canyon Floor", 
    image: "https://source.unsplash.com/collection/560758/random",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in vestibulum erat. Nullam vulputate, quam a pretium eleifend, nisi massa auctor risus, non finibus augue lorem vel quam. Vestibulum id sapien justo. Maecenas lobortis sagittis consequat. Duis mi ipsum, blandit sit amet venenatis quis, rhoncus vitae ex. Interdum et malesuada fames ac ante ipsum primis in faucibus."
  },
  {
    name: "Tropical Coast", 
    image: "https://source.unsplash.com/weekly?water",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in vestibulum erat. Nullam vulputate, quam a pretium eleifend, nisi massa auctor risus, non finibus augue lorem vel quam. Vestibulum id sapien justo. Maecenas lobortis sagittis consequat. Duis mi ipsum, blandit sit amet venenatis quis, rhoncus vitae ex. Interdum et malesuada fames ac ante ipsum primis in faucibus."
  },
  {
    name: "Island Jungle", 
    image: "https://source.unsplash.com/daily",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in vestibulum erat. Nullam vulputate, quam a pretium eleifend, nisi massa auctor risus, non finibus augue lorem vel quam. Vestibulum id sapien justo. Maecenas lobortis sagittis consequat. Duis mi ipsum, blandit sit amet venenatis quis, rhoncus vitae ex. Interdum et malesuada fames ac ante ipsum primis in faucibus."
  },
  {
    name: "Siberian Tundra", 
    image: "https://source.unsplash.com/1600x900/?nature,water",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in vestibulum erat. Nullam vulputate, quam a pretium eleifend, nisi massa auctor risus, non finibus augue lorem vel quam. Vestibulum id sapien justo. Maecenas lobortis sagittis consequat. Duis mi ipsum, blandit sit amet venenatis quis, rhoncus vitae ex. Interdum et malesuada fames ac ante ipsum primis in faucibus."
  },
  {
    name: "Temperate Plains", 
    image: "https://source.unsplash.com/user/erondu/daily",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in vestibulum erat. Nullam vulputate, quam a pretium eleifend, nisi massa auctor risus, non finibus augue lorem vel quam. Vestibulum id sapien justo. Maecenas lobortis sagittis consequat. Duis mi ipsum, blandit sit amet venenatis quis, rhoncus vitae ex. Interdum et malesuada fames ac ante ipsum primis in faucibus."
  },
  {
    name: "Scorching Sand", 
    image: "https://source.unsplash.com/IWD8XelisWc",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in vestibulum erat. Nullam vulputate, quam a pretium eleifend, nisi massa auctor risus, non finibus augue lorem vel quam. Vestibulum id sapien justo. Maecenas lobortis sagittis consequat. Duis mi ipsum, blandit sit amet venenatis quis, rhoncus vitae ex. Interdum et malesuada fames ac ante ipsum primis in faucibus."
  },
  {
    name: "Ocean Waves", 
    image: "https://source.unsplash.com/9QrjShkAmnM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in vestibulum erat. Nullam vulputate, quam a pretium eleifend, nisi massa auctor risus, non finibus augue lorem vel quam. Vestibulum id sapien justo. Maecenas lobortis sagittis consequat. Duis mi ipsum, blandit sit amet venenatis quis, rhoncus vitae ex. Interdum et malesuada fames ac ante ipsum primis in faucibus."
  },
]
 
function seedDB(){
  // Remove all campgrounds
  Campground.remove({}, (err) => {
    // if (err) {
    //   console.log(err)
    // }
    // console.log("removed campgrounds!")
    // Comment.remove({}, function(err) {
    //   if (err) {
    //     console.log(err)
    //   }
    //   console.log("removed comments!")
    //   // Add a few campgrounds
    //   data.forEach((seed) => {
    //     Campground.create(seed, (err, campground) => {
    //       if (err) {
    //         console.log(err)
    //       } 
    //       else {
    //         console.log("added a campground")
    //         // Create a comment
    //         let newcomment = { 
    //           text: "This place is great, but I wish there was internet", 
    //           author: "Homer" 
    //         }
    //         Comment.create(newcomment, (err, comment) => {
    //           if (err) {
    //               console.log(err)
    //           } 
    //           else {
    //             campground.comments.push(comment._id)
    //             campground.save()
    //             console.log("created new comment")
    //           }
    //         })
    //       }
    //     })
    //   })
    // })
  })
}
 
module.exports = seedDB