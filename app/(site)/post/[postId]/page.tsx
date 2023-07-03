"use client"
import Form from '@/components/Form';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import CommentFeed from '@/components/posts/CommentFeed';
import PostItem from '@/components/posts/PostItem';
import usePost from '@/hooks/usePost';
import React from 'react';


const PostView = ({ params }: { params: { postId: string } }) => {
    const postId = params.postId;

    const { data: fetchedPost, isLoading } = usePost(postId as string)
    
    if (isLoading || !fetchedPost) {
        return (
           <Loader />
        )
    }

    return (
        <>
        <Header showBackArrow label="Tweet" />
            <PostItem data={fetchedPost} />
            <Form postId={postId as string} isComment={true} placeholder="reply this Tun!" />
            <CommentFeed comments={fetchedPost?.comments} />
        </>
    );
};

export default PostView;