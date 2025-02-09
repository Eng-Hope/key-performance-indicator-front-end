import NewUser from "./_components/new_user_form";
import UserList from "./_components/user_list";


const Seasons = async () => {
  return (
    <div className="w-full h-screen p-5 flex flex-col gap-3">
      <NewUser />
      <UserList />
    </div>
  );
};

export default Seasons;