import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React, { useState } from "react";
import FeliAppBar from "../../components/Feli/FeliAppBar";
import FeliContent from "../../components/Feli/FeliContent";
import FeliHead from "../../components/Feli/FeliHead";
import Link from "next/link";
import { useRouter } from "next/router";
import { translate } from "../../locales";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { ytIDfromURL } from "../../helpers/youtubeId";

export default function Home({ exams }: { exams: string[] }) {
    const [inputExam, setInputExam] = useState("");
    const [inputSubject, setInputSubject] = useState("");
    const [inputExamYear, setInputExamYear] = useState("");
    const [inputPaper, setInputPaper] = useState("");
    const [inputVidID, setInputVidID] = useState("");
    const [inputVidAuthor, setInputVidAuthor] = useState("");
    const [inputTags, setInputTags] = useState("");
    const [inputQuestion, setInputQuestion] = useState("");

    function parseTags(str: string): string[] {
        const tags = str.replaceAll(", ", ",").replaceAll(" ,", ",").split(",");
        if (tags.length === 1 && tags[0] === "") return [];
        return tags;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            exam: inputExam,
            subject: inputSubject,
            exam_year: inputExamYear,
            paper: inputPaper,
            question: inputQuestion,
            vid_id: inputVidID,
            vid_author: inputVidAuthor,
            tags: parseTags(inputTags),
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
            setInputTags("");
            setInputQuestion("");
        } else {
            console.log(await result.json());
        }
    };

    const router = useRouter();
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
                            value={inputVidAuthor}
                            onChange={(e) => setInputVidAuthor(e.target.value)}
                        />
                        <TextField
                            style={{ width: "100%" }}
                            variant="filled"
                            id="input_paper"
                            label="Tags"
                            value={inputTags}
                            onChange={(e) => setInputTags(e.target.value)}
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
