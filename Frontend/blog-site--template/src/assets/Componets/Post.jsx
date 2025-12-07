
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../App";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const user = useContext(userContext); // { email, username }

  // Fetch single post
  useEffect(() => {
    axios
      .get(`http://localhost:3000/getpostbyid/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Delete post
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/deletepost/${post._id}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Check if logged-in user is the author
  const isOwner = user?.email === post.authorEmail;

  return (
    <div className="post-container">
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      <h2>{post.title}</h2>
      <h3>{post.subtitle}</h3>
      <p>{post.content}</p>
      <p>
        <strong>Author:</strong> {post.author}
      </p>

      {isOwner && (
        <div className="post-actions">
          <Link to={`/editpost/${post._id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Post;

































































// import axios from 'axios'
// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { userContext } from '../../App'




// const Post = () => {

//  const{id}=useParams();
//  const[post,setPost]=useState({})
//  const navigate=useNavigate()
//  const user=useContext(userContext)

//  useEffect(()=>{
//     axios.get('http://localhost:3000/getpostbyid/'+id)
//     .then(result=>{setPost(result.data)
//     })
//     .catch(err=>console.log(err))
//  },[])

//  const handleDelete=(id)=>{

//     axios.delete('http://localhost:3000/deletepost/'+id)
//      .then(result=>{
//         navigate('/');
//     })
//     .catch(err=>console.log(err))


//  }
//   return (
//     <div>
//     <div >
//         <img src={`http://localhost:3000/Images/${post.file}`} alt=""/>
//         <h2>{post.title}</h2>
//         <h2>{post.subtitle}</h2>
//         <p>{post.content}</p>
//         <h4>{post.author}</h4>


//      {
//       user?.email === post?.author ? (
//        <>
//       <Link to={`/editpost/${post._id}`}>Edit</Link>
//       <button onClick={() => handleDelete(post._id)}>Delete</button>
//        </>
//       ) : null
    
//    }






//          {/* {


//            user.email===post.email?
//            <>
           
           
//            <Link to={`/editpost/${post.id}`}>Edit</Link>
//           <button  onClick={e=>handleDelete(post._id)}>Delete</button>
//            </>:<></>
//          } */}
//         <div>
        
      
//         </div>
//     </div>  
//     </div>
//   )
// }

// export default Post
