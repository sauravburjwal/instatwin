import { useToast } from '@/components/ui';
import { Loader, UserCard } from '@/components/shared';
import { useGetUsers } from '@/lib/react-query/queriesAndMutaions';
import { useUserContext } from '@/context/AuthContext';

const AllUsers = () => {
  const { toast } = useToast();
  const { user: currentUser } = useUserContext();
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: 'Something went wrong.' });
    return;
  }
  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading || !creators || !currentUser.id ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) =>
              creator.$id !== currentUser.id ? (
                <li
                  key={creator?.$id}
                  className="flex-1 min-w-[200px] w-full  "
                >
                  <UserCard user={creator} />
                </li>
              ) : null
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
