"use client"
import useUsers from "@/hooks/useUsers"
import Avatar from "../Avatar";
// import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FollowBar = () => {
    const router = useRouter()


 const {data: users=[]} = useUsers()
    if (users.length == 0) {
        return null
    }



    return (
        <div className="px-6 py-4 hidden lg:block">
  <div className="bg-neutral-800 rounded-xl p-4">
    <h2 className="text-orange-600 text-xl font-semibold">Who to Follow</h2>
    <div className="flex flex-col gap-6 mt-4">
      {users.map((user: Record<string, any>) => (
        <Link legacyBehavior href={`/user/${user.id}`} key={user.id}>
          <a className="flex gap-4" onClick={(e) => e.stopPropagation()}>
            <Avatar userId={user.id} />
            <div className="flex flex-col">
              <p className="text-white font-semibold text-sm">{user.name}</p>
              <p className="text-neutral-400 text-sm">@{user.username}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  </div>
</div>
    );
};

export default FollowBar;