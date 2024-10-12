import React from "react";

const MockupJsonData = {
  job_details:
    "To strengthen our editorial team, we are looking for recent graduates who are eager to stay connected to scientific research by helping researchers worldwide publish their latest results. The position of Assistant Editor is full-time, and this position is based in Bangkok, Thailand.\n\nResponsibilities:\n\nCommunicate with scholars and organize the peer-review process for submitted manuscripts\n\nMake sure that accepted manuscripts fit our layout guidelines and can be published in a timely manner\n\nMaintain good lines of communication with the Editor-in-Chief, Editorial Board, authors, and reviewers to ensure the journal’s smooth operation\n\nPay attention to progress in your assigned research fields and assist the Managing Editor in meeting the journal’s targets\n\nComplete other assigned tasks\n\nRequirements:\n\nMaster’s or Ph.D. degree within the past five years\n\nMajors related to mathematics, computational mathematics, probability theory, mathematical statistics, operations research and cybernetics, statistics, theoretical and applied physics, condensed matter physics, acoustics, system science, computer science, software engineering, etc.\n\nTOEIC score 600+, IELTS 6.0+ or TOEFL iBT 60+\n\nAdvanced knowledge of Microsoft Word\n\nStrong learning and communication ability\n\nBenefits:\n\nFlexible working hours\n\nLaptop provided\n\n5 working days a week\n\nPerformance bonus\n\nAnnual bonus\n\nPosition allowance\n\nMonthly allowance\n\nTutorship and tutor allowance\n\nTravel abroad to other MDPI branch offices\n\nTravel allowance\n\nGroup health insurance\n\nSocial security\n\nAnnual physical exam\n\nNew member physical exam\n\nPaid annual leave\n\nTeam activity fund, snacks, and birthday activity fund\n\nWork Location: 26th & 27th floors, The Ninth Towers Grand Rama 9\n\nAs a successful candidate, you will receive full training in editorial work, work closely with Managing Editors, and learn how to process research articles from submission to publication. Training supervised by an assigned tutor will take place on the job during the first six months. Depending on your background, you will be assigned to work on journals related to your field of study or research. No previous editorial experience is required, however, a familiarity with the academic editorial process is an advantage. This is a great opportunity to start your first job in a dynamic multinational company that offers a range of career development options to talented, enthusiastic, and hard-working people.",
};

const Detail: React.FC = () => {
  const paragraphs = MockupJsonData.job_details.split("\n\n");

  return (
    <div
      className="px-2 bg-slate-600 w-3/5 overflow-auto sticky top-16 shadow"
      style={{ height: `calc(100vh - 64px)` }}
    >
      <div className="bg-gray-800 text-gray-300 p-4">
        <h2 className="text-xl font-bold mb-4">Job Details</h2>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Detail;