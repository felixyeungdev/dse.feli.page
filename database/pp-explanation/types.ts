interface pastPaperExplanationDocument {
    exam: string;
    subject: string;
    year: string;
    paper: string;
    vid_id: string;
    vid_author: string;
    tags: string[];
    question: string;
    createdAt: number;
    createdBy: string;
}

export type { pastPaperExplanationDocument };

// {
//     "exam": "HKDSE",
//     "subject": "PHY",
//     "year": "2020",
//     "paper": "1A",
//     "vid_id": "35Adpcm4yuE",
//     "vid_author": "Herman Yeung",
//     "tags": [
//         "Physics",
//         "Force and Motion",
//         "Force & Motion"
//     ],
//     "question": "7",
//     "createdAt": 1610968411014,
//     "createdBy": "admin"
// }
