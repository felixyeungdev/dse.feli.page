import ActionButton from "@/components/Button/Action";
import Content from "@/components/Content";
import ExplanationResultCard from "@/components/Explanation/ResultCard";
import PageHead from "@/components/Head";
import { translate } from "locales";
import { useRouter } from "next/router";
import React, {
    ChangeEvent,
    forwardRef,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

const ExplanationsPage = () => {
    const router = useRouter();
    const { locale } = router;
    const [subject, setSubject] = useState("");
    const [exam, setExam] = useState("");
    const [year, setYear] = useState("");
    const [paper, setPaper] = useState("");
    const [question, setQuestion] = useState("");
    const [slug, setSlug] = useState("");
    const [cards, setCards] = useState<JSX.Element[]>(null);

    const subjectRef = useRef(null);
    const examRef = useRef(null);
    const yearRef = useRef(null);
    const paperRef = useRef(null);
    const questionRef = useRef(null);

    const fetchData = async () => {
        const combined = subject + exam + year + paper + question + slug;
        if (combined === "") {
            renderData([]);
            return;
        }
        const res = await fetch(
            `/api/explanations/search?subject=${subject}&exam=${exam}&year=${year}&paper=${paper}&question=${question}&slug=${slug}`
        );
        const json = await res.json();
        renderData(json);
    };

    const renderData = async (json: any[]) => {
        const cards = json.map((data) => {
            return <ExplanationResultCard data={data} key={Math.random()} />;
        });
        setCards(cards);
    };

    useEffect(() => {
        fetchData();
    }, [subject, exam, year, paper, question, slug]);

    const clearSearch = () => {
        setSubject("");
        setExam("");
        setYear("");
        setPaper("");
        setQuestion("");
        setSlug("");
        subjectRef.current.clear();
        examRef.current.clear();
        yearRef.current.clear();
        paperRef.current.clear();
        questionRef.current.clear();
    };

    return (
        <>
            <PageHead title={translate(locale, "explanations")} />
            <Content>
                <h1>{translate(locale, "explanations")}</h1>
                <div className="flex justify-between">
                    <h2>{translate(locale, "search")}</h2>
                    <ActionButton onClick={clearSearch}>Clear</ActionButton>
                </div>
                {/* <div className="">
                    <label htmlFor="search" className="block">
                        Query
                    </label>
                    <SlowInput value={slug} onChange={setSlug} />
                </div> */}
                <div className="">
                    <Select
                        label="Subject"
                        searchKey="subject"
                        onSelect={setSubject}
                        ref={subjectRef}
                        {...{ subject, exam, year, paper, question, slug }}
                    />
                    <Select
                        label="Exam"
                        searchKey="exam"
                        onSelect={setExam}
                        ref={examRef}
                        {...{ subject, exam, year, paper, question, slug }}
                    />
                    <Select
                        label="Year"
                        searchKey="year"
                        onSelect={setYear}
                        ref={yearRef}
                        {...{ subject, exam, year, paper, question, slug }}
                    />
                    <Select
                        label="Paper"
                        searchKey="paper"
                        onSelect={setPaper}
                        ref={paperRef}
                        {...{ subject, exam, year, paper, question, slug }}
                    />
                    <Select
                        label="Question"
                        searchKey="question"
                        onSelect={setQuestion}
                        ref={questionRef}
                        {...{ subject, exam, year, paper, question, slug }}
                    />
                </div>
                <h2 className="mt-4">{translate(locale, "result")}</h2>
                <div className="flex flex-wrap gap-4 mb-4">
                    {cards?.length > 0 ? (
                        cards
                    ) : (
                        <div className="text-xl">
                            Please select at least one item above
                        </div>
                    )}
                </div>
            </Content>
        </>
    );
};

interface SelectProps {
    subject: string;
    exam: string;
    year: string;
    paper: string;
    question: string;
    slug: string;
    searchKey: string;
    label: string;
    onSelect: (value: string) => void;
}

const Select = forwardRef((props: SelectProps, ref) => {
    const {
        subject,
        exam,
        year,
        paper,
        question,
        slug,
        searchKey,
        label,
        onSelect,
    } = props;

    const [value, setValue] = useState("");
    const defaultOption = (
        <option value="" key="">
            ---
        </option>
    );
    const [options, setOptions] = useState([defaultOption]);
    const router = useRouter();
    const { locale } = router;

    const searchSubject = searchKey === "subject" ? "" : subject;
    const searchExam = searchKey === "exam" ? "" : exam;
    const searchYear = searchKey === "year" ? "" : year;
    const searchPaper = searchKey === "paper" ? "" : paper;
    const searchQuestion = searchKey === "question" ? "" : question;
    const searchSlug = searchKey === "slug" ? "" : slug;

    useImperativeHandle(ref, () => ({
        clear() {
            setValue("");
        },
    }));

    const fetchData = async () => {
        const response = await fetch(
            `/api/explanations/simpleSearch?subject=${searchSubject}&exam=${searchExam}&year=${searchYear}&paper=${searchPaper}&question=${searchQuestion}&key=${searchKey}&slug=${searchSlug}`
        );
        const json = await response.json();
        renderData(json);
    };

    const renderData = (data: any[]) => {
        const options = data.map((item) => {
            const { id, count } = item;
            return (
                <option value={id ?? ""} key={id}>
                    {translate(locale, id ?? "total")}
                </option>
            );
        });
        setOptions([defaultOption, ...options]);
    };

    useEffect(() => {
        fetchData();
    }, [subject, exam, year, paper, question, slug, searchKey]);

    const change = (value: string) => {
        setValue(value);
        onSelect(value);
    };

    return (
        <label className="block bg-gray-200 mt-2 py-2 px-4 rounded-md ring-gray-400 focus-within:ring-4 transition">
            {label}
            <select
                onChange={(e) => change(e.target.value)}
                value={value}
                className="bg-gray-100 ml-2 px-2 py-1 rounded focus:outline-none"
            >
                {options}
            </select>
        </label>
    );
});

interface SlowInputProps {
    onChange: (value: string) => void;
    value: string;
}

const SlowInput = ({ value, onChange }: SlowInputProps) => {
    const [localValue, setLocalValue] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => onChange(localValue), 500);
        return () => clearTimeout(timeout);
    }, [localValue]);

    useEffect(() => setLocalValue(value), [value]);

    const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLocalValue(value);
    };

    return (
        <input
            onChange={onValueChange}
            value={localValue}
            type="text"
            className="mt-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 py-2 px-4 w-full rounded-md focus:outline-none ring-gray-400 focus:ring-4 transition"
            id="subject"
            placeholder="EXAM SUBJECT YEAR/PAPER/QUESTION"
        />
    );
};

export default ExplanationsPage;
