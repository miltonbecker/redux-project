CREATE TABLE comments (
    id integer NOT NULL,
    username character varying(200) NOT NULL,
    email character varying(200),
    content text NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE comments_id_seq OWNED BY comments.id;

ALTER TABLE ONLY comments ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);

COPY comments (username, email, content) FROM stdin;
Ned Stark	\N	Winter is coming!
Jon Snow	\N	Nope, not dying.
Tyrion Lannister	\N	The comments are the sword of the brain.
\.

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);