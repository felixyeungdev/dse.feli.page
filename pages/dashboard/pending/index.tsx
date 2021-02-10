import ActionButton from "@/components/Button/Action";
import Content from "@/components/Content";
import PageHead from "@/components/Head";
import SlowInput from "@/components/Input/slow";
import { useAuth } from "@/firebase/client/authProvider";
import React, { useEffect, useState } from "react";

const Pending = () => {
    const [url, setUrl] = useState("");
    const [id, setId] = useState("");
    const [type, setType] = useState("");
    const [pending, setPending] = useState<any[]>([]);
    const { currentUser } = useAuth();

    // https://www.youtube.com/playlist?list=PLzDe9mOi1K8onyKY5YNHBEAUroREi6g_l

    const fetchPending = async () => {
        if (!currentUser) return;
        const response = await fetch("/api/pending", {
            headers: {
                Authorization: await currentUser.getIdToken(),
            },
        });
        const json = await response.json();
        setPending(json);
    };

    useEffect(() => {
        fetchPending();
        const looper = setInterval(fetchPending, 5000);
        return () => {
            clearInterval(looper);
        };
    }, [currentUser]);

    useEffect(() => {
        let id: string;
        let type: string;
        try {
            const urlObj = new URL(url);
            id = urlObj.searchParams.get("v");
            if (id) {
                type = "video";
            } else {
                id = urlObj.searchParams.get("list");
                id && (type = "playlist");
            }
        } catch (error) {}
        setType(type);
        setId(id);
    }, [url]);

    const handleSubmit = async () => {
        console.log({ type, id });
        if (!type || !id) return;
        await fetch("/api/pending/add", {
            method: "POST",
            headers: {
                Authorization: await currentUser.getIdToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ type, id }),
        });
    };

    const startPending = async () => {
        await fetch("/api/pending/start", {
            method: "POST",
            headers: {
                Authorization: await currentUser.getIdToken(),
                "Content-Type": "application/json",
            },
        });
    };

    return (
        <>
            <PageHead title="Manage Pending Playlists and Videos" />
            <Content>
                <div>
                    <h1>Add</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className="flex space-x-2 items-center justify-between"
                    >
                        <SlowInput
                            onChange={setUrl}
                            value={url}
                            placeholder="URL"
                        />
                        <ActionButton onClick={() => {}}>Submit</ActionButton>
                    </form>
                </div>
                <div className="mt-4">
                    <h1>Preview</h1>
                    <p>Type: {type}</p>
                    <p>ID: {id}</p>
                </div>
                <div className="my-4">
                    <div className="flex justify-between items-center">
                        <h1>Pending ({pending.length})</h1>
                        <ActionButton onClick={startPending}>
                            Start
                        </ActionButton>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                        {pending.map((datum) => {
                            return (
                                <pre className="text-xs" key={Math.random()}>
                                    {datum.type}: {datum.id};
                                </pre>
                            );
                        })}
                    </div>
                </div>
            </Content>
        </>
    );
};

export default Pending;
