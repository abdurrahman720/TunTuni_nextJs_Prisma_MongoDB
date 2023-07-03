"use client"
import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { toast } from "react-hot-toast";
import axios from "axios";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId);
  
    const loginModal = useLoginModal();
  
    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likeIds || [];
        return list.includes(currentUser?.id)
   },[currentUser?.id, fetchedPost?.likeIds])


  
    const toggleLike = useCallback(async () => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
  
      try {
        let request;
        if (hasLiked) {
          request = () => axios.delete(`/api/like/${postId}`);
        } else {
          request = () => axios.post(`/api/like/${postId}`);
        }
  
        await request();
        mutateFetchedPosts();
        mutateFetchedPost();
  
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong");
      }
    }, [
      currentUser,
      hasLiked,
      loginModal,
      mutateFetchedPost,
      mutateFetchedPosts,
      postId,
    ]);
  
    return {
      hasLiked,
      toggleLike,
    };
  };
  
  export default useLike;
