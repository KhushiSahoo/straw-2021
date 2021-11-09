const mongoose = require('mongoose');
const Animal= require('./models/animal');
const Blog =require('./models/blog');

//connecting with mongo
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/pawws');
  console.log("connection open");
}

/*const p = new Product({
    name: 'Ruby Grapefruit',
    price: 2,
    category:'fruits'
})

p.save()
  .then(p =>{
      console.log(p)
  })*/

 const seedProducts =[
     {
        name : 'Kiyo',
        category : 'cat',
        age: 1,
        author:'617a382f60edffce606a362d',
        location : 'Rourkela , Odisha',
        info: 'friendly cute',
        image: 'https://media.istockphoto.com/photos/maine-coon-kitten-on-scratching-post-picture-id1085283872?k=20&m=1085283872&s=612x612&w=0&h=4eNHkVBTSafuXwzweP-o4SRrWi9dGb6awQZR0rtXqHc='
     },
     {
        name : 'Hachikoo',
        category : 'dog',
        age: 2,
        author:'617a382f60edffce606a362d',
        location : 'Cuttak , Odisha',
        info: ' breed : doberman , friendly ',
        image:'https://media.istockphoto.com/photos/doberman-pinscher-picture-id948013218?k=20&m=948013218&s=612x612&w=0&h=HmpzOXw-eF0tdz6kkGAOtPJlChvBUN8uTc2SvUipEMc='

     },
     {
        name : 'Nemo',
        category : 'fish',
        age: 1,
        author:'617a382f60edffce606a362d',
        location : 'Rourkela, Odisha',
        info: ' clown fishh miss mpidd',
        image:'https://media.istockphoto.com/photos/clown-anemonefish-front-view-on-brown-anemone-picture-id580135042?k=20&m=580135042&s=612x612&w=0&h=2G68oI2hShS_x3SMoDZOqTqZfiR1v77a0VRr_nDpNPI='
         
     },
     {
        name : 'Shi-Shi-manu',
        category : 'dog',
        age: 2,
        author:'617a382f60edffce606a362d',
        location : 'Cuttak , Odisha',
        info: ' breed : Golden Retriver , friendly ',
        image:'https://media.istockphoto.com/photos/golder-retriever-standing-by-a-rural-fence-picture-id1181270413?k=20&m=1181270413&s=612x612&w=0&h=KZBpWU4AOYrAoYAFoaQiQkAt3Z26pLWvM7ODR6LVv0g='
     },
     {
        name : 'Scooby-Doo',
        category : 'dog',
        age: 2,
        author:'617a382f60edffce606a362d',
        location : 'Bhubneshwar, Odisha',
        info: ' breed : Husky , friendly ',
        image:'https://media.istockphoto.com/photos/portrait-of-a-siberian-husky-looking-at-the-camera-with-mouth-open-on-picture-id1286481312?k=20&m=1286481312&s=612x612&w=0&h=lHLLkyo8yEonlR3hYDE7Vzp7_knWv-kuOdspNkcPH-o='
     },
     {
        name : 'Totoro',
        category : 'rabbit',
        age: 2,
        author:'617a382f60edffce606a362d',
        location : 'Bhubneshwar , Odisha',
        info: 'friendly ',
        image:'https://media.istockphoto.com/photos/cute-easter-bunny-with-big-ears-outdoors-picture-id93198717?k=20&m=93198717&s=612x612&w=0&h=22pIt5Ov1as74GsHegTJwYtbsk7MKKfjvxqvsYatOhA='


     },
     {
        name : 'Thomas',
        category : 'cat',
        age: 2,
        author:'617a382f60edffce606a362d',
        location : 'Cuttak , Odisha',
        info: ' friendly ',
        image:'https://media.istockphoto.com/photos/domestic-life-with-cat-picture-id1134929540?k=20&m=1134929540&s=612x612&w=0&h=fC1BrUP-kUUxokrjnlcSqrdHxvCZN3d_0lwwZjQlXcM='
     },
     {
        name : 'Jerry',
        category : 'mouse',
        age: 2,
        author:'617a382f60edffce606a362d',
        location : 'Rourkela , Odisha',
        info: ' Hamster friendly ',
        image:'https://media.istockphoto.com/photos/hamster-picture-id455208643?k=20&m=455208643&s=612x612&w=0&h=k9etKvWbViJbVaRwOAKlJQitAjX_8TFVPmZM3XTp9dM='
     }
 ] 
const BlogProducts =[
   {
      name:'Jenny',
      title:'First aid',
      author:'617a382f60edffce606a362d',
      images: [
         {
            url: 'https://res.cloudinary.com/dypsug3kl/image/upload/v1635916550/Straw/jf6oqyjg7sepbtxglnk4.jpg',
            filename: 'Straw/jf6oqyjg7sepbtxglnk4',
          },
          {
            url: 'https://res.cloudinary.com/dypsug3kl/image/upload/v1635916579/Straw/wnw0wq18c2biwxlvmej6.jpg',
            filename: 'Straw/wnw0wq18c2biwxlvmej6',
          }
       ],
      info:'gibregjgkgkj gjguggjj gugiuuit oioyioy'
   },
   {
      name:'Hannah',
      title:'train aid',
      author:'617a382f60edffce606a362d',
      images: [
         {
            url: 'https://res.cloudinary.com/dypsug3kl/image/upload/v1635916550/Straw/jf6oqyjg7sepbtxglnk4.jpg',
            filename: 'Straw/jf6oqyjg7sepbtxglnk4',
          },
          {
            url: 'https://res.cloudinary.com/dypsug3kl/image/upload/v1635916579/Straw/wnw0wq18c2biwxlvmej6.jpg',
            filename: 'Straw/wnw0wq18c2biwxlvmej6',
          }
       ],
      info:'gibregjgkgkj gjguggjj gugiuuit oioyioy'
   },
   {
      name:'Bloomah',
      title:'perfect Feed',
      author:'617a382f60edffce606a362d',
      images: [
         {
            url: 'https://res.cloudinary.com/dypsug3kl/image/upload/v1635916550/Straw/jf6oqyjg7sepbtxglnk4.jpg',
            filename: 'Straw/jf6oqyjg7sepbtxglnk4',
          },
          {
            url: 'https://res.cloudinary.com/dypsug3kl/image/upload/v1635916579/Straw/wnw0wq18c2biwxlvmej6.jpg',
            filename: 'Straw/wnw0wq18c2biwxlvmej6',
          }
       ],
      info:'gibregjgkgkj gjguggjj gugiuuit oioyioy'
   },

]






 Animal.insertMany(seedProducts)
 .then(res =>{
     console.log(res)
 })
 .catch(e =>{
     console.log(e)
 })

 Blog.insertMany(BlogProducts)
 .then(res =>{
     console.log(res)
 })
 .catch(e =>{
     console.log(e)
 })