import FeliAppBar from "../../../components/Feli/FeliAppBar";
import FeliContent from "../../../components/Feli/FeliContent";
import FeliHead from "../../../components/Feli/FeliHead";
import { getExplanations } from "../../../database/explanation";
import { translate } from "../../../locales";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Collapse from "@material-ui/core/Collapse";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { ColDef, DataGrid, ValueGetterParams } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Divider from "@material-ui/core/Divider";

// subject;
// exam;
// year;
// paper;
// question;
// videos;

export default function Home() {
    const [explanations, setExplanations] = useState(null);
    const [videoActionFields, setVideoActionFields] = useState({});
    const [dialogOpened, setDialogOpened] = useState(false);
    const [dialogId, setDialogId] = useState(null);
    const router = useRouter();
    const columns: ColDef[] = [
        { field: "id", headerName: translate(router.locale, "id"), hide: true },
        {
            field: "subject",
            headerName: translate(router.locale, "subject"),
            width: 100,
            hide: true,
        },
        {
            field: "exam",
            headerName: translate(router.locale, "exam"),
            width: 130,
            hide: true,
        },
        {
            field: "year",
            headerName: translate(router.locale, "year"),
            width: 130,
            hide: true,
        },
        {
            field: "paper",
            headerName: translate(router.locale, "paper"),
            width: 130,
            hide: true,
        },
        {
            field: "question",
            headerName: translate(router.locale, "question"),
            type: "number",
            width: 80,
            hide: true,
        },
        {
            field: "full",
            headerName: translate(router.locale, "full"),
            sortable: false,
            width: 300,
            valueGetter: (params: ValueGetterParams) => {
                const subject = params.getValue("subject");
                const exam = params.getValue("exam");
                const paper = params.getValue("paper");
                const question = params.getValue("question");
                const year = params.getValue("year");
                return `${exam} ${subject} ${year}/${paper}/Q${question}`;
            },
        },
        { field: "videos", headerName: "videos", width: 250 },
        {
            field: "edit",
            headerName: translate(router.locale, "edit"),
            width: 300,
            disableColumnMenu: true,
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: (params: ValueGetterParams) => {
                const id = params.getValue("id");
                return (
                    <Button
                        onClick={() => edit(id.toString())}
                        size="small"
                        variant="outlined"
                    >
                        Edit
                    </Button>
                );
            },
        },
    ];

    useEffect(() => {
        getExplanations();
    }, []);

    const getExplanations = async () => {
        const response = await fetch(`/api/explanations`);
        const json = await response.json();
        setExplanations(json);
    };

    const edit = (id: string) => {
        setDialogId(id);
        setDialogOpened(true);
    };

    const alterVideo = async (id: string, video: string, action: string) => {
        var videoId: string;
        try {
            videoId = new URL(video).searchParams.get("v");
        } catch (error) {
            videoId = video;
        }
        if (!videoId || videoId.length !== 11) {
            alert("Invalid Video");
            return;
        }
        if (action === "add") {
        }
    };

    const dialogOnClose = () => {
        setDialogOpened(false);
        getExplanations();
    };

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
                <Container>
                    <Paper
                        style={{
                            height: "800px",
                            width: "100%",
                        }}
                    >
                        <DataGrid
                            disableSelectionOnClick
                            showToolbar
                            rows={explanations || []}
                            columns={columns}
                            autoPageSize
                            checkboxSelection
                            density="compact"
                        />
                    </Paper>
                </Container>
                <VideoDialog
                    open={dialogOpened}
                    onClose={dialogOnClose}
                    id={dialogId}
                />
            </FeliContent>
        </>
    );
}

function VideoDialog({
    open,
    onClose,
    id,
}: {
    open: boolean;
    onClose: () => void;
    id: string;
}) {
    const [data, setData] = useState(null);
    const [inputVideoID, setInputVideoID] = useState("");

    useEffect(() => {
        getExplanationDetails(id);
    }, [open]);

    const handleClose = () => {
        onClose();
    };

    const getExplanationDetails = async (id) => {
        if (!open) return;
        const response = await fetch(`/api/explanations?id=${id}`);
        const json = await response.json();
        if (json && json.length > 0) {
            setData(json[0]);
        }
    };

    const submitVideo = async (e) => {
        e.preventDefault();
        if (inputVideoID.length !== 11) return;
        await fetch(`/api/explanations/addVideo?id=${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ videoId: inputVideoID }),
        });
        setInputVideoID("");
        await getExplanationDetails(id);
    };
    const removeVideo = async (videoId) => {
        await fetch(`/api/explanations/removeVideo?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ videoId: videoId }),
        });
        await getExplanationDetails(id);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Explanation</DialogTitle>
            <List dense disablePadding>
                <ListItem>
                    <ListItemText primary={id} secondary={"ID"}></ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            data
                                ? `${data.exam} ${data.subject} ${data.year}/${data.paper}/Q${data.question}`
                                : ""
                        }
                        secondary={"Full"}
                    ></ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={data && data.subject}
                        secondary={"Subject"}
                    ></ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={data && data.exam}
                        secondary={"Exam"}
                    ></ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={data && data.exam}
                        secondary={"Exam"}
                    ></ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={data && data.year}
                        secondary={"Year"}
                    ></ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={data && data.paper}
                        secondary={"Paper"}
                    ></ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={data && data.question}
                        secondary={"Question"}
                    ></ListItemText>
                </ListItem>
            </List>
            <List dense disablePadding>
                {data &&
                    data.videos.map((vid) => {
                        return (
                            <VideoListItem
                                id={vid}
                                key={id}
                                deleteClick={() => removeVideo(vid)}
                            />
                        );
                    })}
            </List>
            <Divider />
            <form onSubmit={submitVideo} style={{ width: "100%" }}>
                <TextField
                    variant="filled"
                    label="Video ID"
                    fullWidth
                    value={inputVideoID}
                    onChange={(e) => {
                        const input = e.target.value;
                        try {
                            setInputVideoID(
                                new URL(input).searchParams.get("v")
                            );
                        } catch (error) {
                            setInputVideoID(input);
                        }
                    }}
                />
                <VideoListItem id={inputVideoID} key={id} />
            </form>
        </Dialog>
    );
}

function VideoListItem({
    id,
    deleteClick,
}: {
    id: string;
    deleteClick?: () => {};
}) {
    console.log(`Vid ${id}`);
    const [data, setData] = useState(null);
    useEffect(() => {
        (async () => {
            const video = await getVideoDetails(id);
            setData(video);
        })();
    }, [id]);

    const getVideoDetails = async (id) => {
        const response = await fetch(`/api/videos?id=${id}`);
        const json = await response.json();
        if (json) {
            return json.video;
        }
        return null;
    };

    if (!id || id === "") return <></>;

    return (
        <ListItem>
            <ListItemText
                primary={data ? data.title : id}
                secondary={data ? data.uploader : ""}
            />
            {deleteClick && (
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={deleteClick}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            )}
        </ListItem>
    );
}

// export async function getStaticProps(context) {
//     const explanations = await getExplanations({});
//     // console.log(explanations);
//     return { props: { explanations }, revalidate: 1 };
// }
