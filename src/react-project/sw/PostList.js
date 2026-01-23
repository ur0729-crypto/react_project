import PostItem from "./PostItem";

export default function PostList({ posts, onDeletePost, onUpdatePost, onToggleLike }) {
  return (
    <div className="timeline">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onDelete={() => onDeletePost(post.id)}
          onUpdate={(patch) => onUpdatePost(post.id, patch)}
          onToggleLike={() => onToggleLike(post.id)}
        />
      ))}
    </div>
  );
}


