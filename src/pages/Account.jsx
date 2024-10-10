import AccountSetting from "@/components/account/AccountSetting";
import Cards from "@/components/account/Cards";
import Profile from "@/components/account/Profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Account = () => {
  return (
    <div>
      <h1 className="text-center text-[40px] font-semibold font-bricolage">
        Account
      </h1>
      <div>
        <Tabs defaultValue="profile" className="w-full ">
          <TabsList className="font-bricolage  text-[#B3B3B3] justify-start m-10 shadow-none bg-white rounded-none border-b w-full p-0 flex gap-4">
            <TabsTrigger
              className="data-[state=active]:text-[#7C4CFF] border-b-[#7C4CFF]"
              value="profile"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:text-[#7C4CFF]"
              value="cards"
            >
              Cards
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:text-[#7C4CFF]"
              value="account setting"
            >
              Account Setting
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Profile />
          </TabsContent>
          <TabsContent value="cards">
            <Cards />
          </TabsContent>
          <TabsContent value="account setting">
            <AccountSetting />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
