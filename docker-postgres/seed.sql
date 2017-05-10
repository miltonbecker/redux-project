--
-- TOC entry 190 (class 1259 OID 16438)
-- Name: comments; Type: TABLE; Schema: public; Owner: milton
--

CREATE TABLE comments (
    id integer NOT NULL,
    username character varying(200) NOT NULL,
    email character varying(200),
    content text NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL
);

--
-- TOC entry 189 (class 1259 OID 16436)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: milton
--

CREATE SEQUENCE comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2405 (class 0 OID 0)
-- Dependencies: 189
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: milton
--

ALTER SEQUENCE comments_id_seq OWNED BY comments.id;


--
-- TOC entry 2278 (class 2604 OID 16441)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: milton
--

ALTER TABLE ONLY comments ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);


--
-- TOC entry 2400 (class 0 OID 16438)
-- Dependencies: 190
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: milton
--

COPY comments (id, username, email, content, date) FROM stdin;
43	Ned Stark	\N	Winter is coming!	2017-04-16 19:19:23.186349
44	Jon Snow	\N	Nope, not dying.	2017-04-16 19:19:41.330657
45	Tyrion Lannister	\N	The comments are the sword of the brain.	2017-04-16 19:20:09.312438
\.


--
-- TOC entry 2406 (class 0 OID 0)
-- Dependencies: 189
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: milton
--

SELECT pg_catalog.setval('comments_id_seq', 45, true);


--
-- TOC entry 2281 (class 2606 OID 16446)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: milton
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
