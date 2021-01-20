import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React, { useEffect, useState } from "react";
import FeliAppBar from "../../components/Feli/FeliAppBar";
import FeliContent from "../../components/Feli/FeliContent";
import FeliHead from "../../components/Feli/FeliHead";
import Link from "next/link";
import { useRouter } from "next/router";
import { translate } from "../../locales";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { ytIDfromURL } from "../../helpers/youtubeId";
import Typography from "@material-ui/core/Typography";

export default function Home({ exams }: { exams: string[] }) {
    const [currentVideo, setCurrentVideo] = useState(null);

    const [inputExam, setInputExam] = useState("");
    const [inputSubject, setInputSubject] = useState("");
    const [inputExamYear, setInputExamYear] = useState("");
    const [inputPaper, setInputPaper] = useState("");
    const [inputVidID, setInputVidID] = useState("");
    const [inputVidAuthor, setInputVidAuthor] = useState("");
    const [inputQuestion, setInputQuestion] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            exam: inputExam,
            subject: inputSubject,
            year: inputExamYear,
            paper: inputPaper,
            question: inputQuestion,
            vid_id: inputVidID,
            vid_author: inputVidAuthor,
        };
        const result = await fetch("/api/addExplanation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (result.status === 201) {
            setInputExam("");
            setInputSubject("");
            setInputExamYear("");
            setInputPaper("");
            setInputVidID("");
            setInputVidAuthor("");
            setInputQuestion("");
            setCurrentVideo(null);
            getNewVideo();
        } else {
            console.log(await result.json());
        }
    };

    const router = useRouter();

    const getNewVideo = async () => {
        const response = await fetch("/api/videos/pending");
        const json = await response.json();
        setCurrentVideo(json.result);
        setInputVidID(json.result.id);
        setInputVidAuthor(json.result.uploader);
    };

    const autoFill = () => {
        if (!currentVideo) return;
        const { title: t }: { title: string } = currentVideo;
        const title = t.toLowerCase();
        const exams = {
            hkdse: "HKDSE",
            hkcee: "HKCEE",
            hkale: "HKALE",
        };
        const subjects = {
            chinese: "CHI",
            english: "ENG",
            math: "MAT",
            chem: "CHEM",
            phy: "PHY",
            biology: "BIO",
        };
        for (var exam of Object.keys(exams)) {
            if (title.includes(exam)) {
                setInputExam(exams[exam]);
            }
        }
        for (var subject of Object.keys(subjects)) {
            if (title.includes(subject)) {
                setInputSubject(subjects[subject]);
            }
        }
    };

    useEffect(() => {
        getNewVideo();
    }, []);
    useEffect(() => {
        currentVideo && autoFill();
    }, [currentVideo]);

    return (
        <>
            <FeliHead title={translate(router.locale, "explanation")} />
            <FeliAppBar
                crumbs={[
                    {
                        display: translate(router.locale, "explanation"),
                        href: "/",
                    },
                ]}
            />
            <FeliContent center>
                <Paper
                    style={{
                        padding: 16,
                        minWidth: 350,
                        maxWidth: 1000,
                    }}
                >
                    <Typography>
                        {currentVideo !== null && currentVideo.title}
                    </Typography>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField
                            style={{ width: "100%" }}
                            variant="filled"
                            id="input_exam"
                            label="Exam"
                            value={inputExam}
                            onChange={(e) =>
                                setInputExam(e.target.value.toUpperCase())
                            }
                        />
                        <TextField
                            style={{ width: "100%" }}
                            variant="filled"
                            id="input_subject"
                            label="Subject"
                            value={inputSubject}
                            onChange={(e) =>
                                setInputSubject(e.target.value.toUpperCase())
                            }
                        />
                        <TextField
                            style={{ width: "100%" }}
                            variant="filled"
                            id="input_examYear"
                            label="Exam Year"
                            value={inputExamYear}
                            onChange={(e) => setInputExamYear(e.target.value)}
                        />
                        <TextField
                            style={{ width: "100%" }}
                            variant="filled"
                            id="input_paper"
                            label="Paper"
                            value={inputPaper}
                            onChange={(e) => setInputPaper(e.target.value)}
                        />
                        <TextField
                            style={{ width: "100%" }}
                            variant="filled"
                            id="input_paper"
                            label="Question"
                            value={inputQuestion}
                            onChange={(e) => setInputQuestion(e.target.value)}
                        />
                        <TextField
                            style={{ width: "100%" }}
                            variant="filled"
                            id="input_paper"
                            label="Video ID"
                            disabled
                            value={inputVidID}
                            onChange={(e) =>
                                setInputVidID(ytIDfromURL(e.target.value))
                            }
                        />
                        <TextField
                            style={{ width: "100%" }}
                            variant="filled"
                            id="input_paper"
                            label="Video Author"
                            disabled
                            value={inputVidAuthor}
                            onChange={(e) => setInputVidAuthor(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </form>
                </Paper>
            </FeliContent>
        </>
    );
}
