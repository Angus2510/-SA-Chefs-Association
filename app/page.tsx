import Image from "next/image";
import MembershipForm from "@/components/membership-form";
import ProfileCardDemo from "@/components/profile-card-demo";

export default function Home() {
  return (
    <div className="bg-[#1b2942]">
      <div className="mt-12">
        <Image
          src="/SA-chefs-logo-white.png"
          alt="Logo"
          width={200}
          height={200}
          className="mx-auto my-4"
        />
      </div>
      <Image
        src="/SA-chefs-logo-white.png"
        alt="Logo"
        width={200}
        height={200}
        className="mx-auto my-4"
      />
      <h1 className="text-5xl font-bold text-center my-8 text-white">
        SA Chefs Association - Board of Directors 2025-2027 Voting Form
      </h1>
      <div className="max-w-4xl mx-auto px-4 mb-8  text-white">
        <div className=" rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            As per the rules of the Association:
          </h2>

          <p className="mb-4">
            Voting members may vote only in the election of national officers
            and all other business on the agenda at the Annual General Meeting
            (AGM). All other business requiring the vote of members is vested in
            the Board of SA Chefs.
          </p>

          <h3 className="font-bold mt-4 mb-2">2.2.1 Voting Members</h3>
          <p className="mb-4">
            The following shall form part of the Voting Members class and shall
            be designated by the name below, without creating a separate class
            in each instance. Members below in good standing* shall have full
            voting rights.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold">
                2.2.1.1 Professional Membership sub-category
              </h4>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  A Voting Member who falls within the sub-category of being a
                  professional membership of the hospitality and supporting
                  industries with a minimum of three (3) years&apos; experience
                  in the industry;
                </li>
                <li>
                  A Voting Member who has followed an SA Chefs recognised
                  training program or has been an Intermediate Member in good
                  standing for a minimum of three (3) consecutive years.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold">
                2.2.1.2 Foreign Based Professional Membership sub-category
              </h4>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  A Voting Member who falls within the sub-category of being a
                  professional member of the hospitality and supporting
                  industries with a minimum of three (3) years&apos; experience
                  in the industry, who resides outside the republic of South
                  Africa;
                </li>
                <li>
                  A Voting Member who has followed an SA Chefs recognised
                  training program or has been part of the Intermediate
                  Membership sub-category.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold">
                2.2.1.3 Intermediate Membership sub-category
              </h4>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  A Voting Member who has not yet obtained three (3) years&apos;
                  professional experience in hospitality and supporting
                  industries shall be categorised as qualifying for Intermediate
                  Membership.
                </li>
                <li>
                  After three (3) consecutive years of membership in good
                  standing*, an application may be made by Voting Members
                  qualifying for SA Chefs Professional Membership.
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-lg font-bold">
            Voting is open from 2 March until 15 March - No votes will be
            counted after the closing date
          </p>
        </div>
      </div>
      <MembershipForm />
      <h3 className="text-3xl font-bold text-center my-8 text-white">
        Mark your Vote for the Candidates of your Choice. (you may select a
        minimum of 2 and up to a maximum of 8 candidates)
      </h3>
      <ProfileCardDemo />
    </div>
  );
}
