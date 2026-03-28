--
-- PostgreSQL database dump
--

\restrict leWk1bYdTLgjuvjKKVrbJRK5jByb2evZYGTOniufVUChmYxP4f8oTP5frHqfABD

-- Dumped from database version 15.15 (Homebrew)
-- Dumped by pg_dump version 15.15 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contacts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contacts (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255),
    phone_number character varying(20) NOT NULL,
    address character varying(255),
    birthday timestamp with time zone,
    notes text,
    is_favorite boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    phone_number character varying(20) NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.contacts (id, user_id, name, email, phone_number, address, birthday, notes, is_favorite, created_at, updated_at) FROM stdin;
1	1	Jamie Laney	\N	333-444-1234	San Francisco, CA	\N	Gym buddy	f	2026-03-23 08:38:19.423455-04	2026-03-23 08:38:19.423455-04
2	1	Susan Brady	susan.brady11@mail.com	563-987-0123	San Diego, CA	\N	Sister in law	t	2026-03-23 08:38:19.423455-04	2026-03-23 08:38:19.423455-04
3	1	Annie Brown	annieann333@mail.com	789-654-9807	Los Angeles, CA	2000-11-11 00:00:00-05	Little Sister	t	2026-03-23 08:38:19.423455-04	2026-03-23 08:38:19.423455-04
4	2	Tester One	test1@mail.com	123-456-7890	\N	\N	\N	f	2026-03-23 08:38:19.423455-04	2026-03-23 08:38:19.423455-04
5	2	Tester Two	test2@mail.com	987-654-1234	\N	\N	\N	f	2026-03-23 08:38:19.423455-04	2026-03-23 08:38:19.423455-04
6	2	Tester Three	test3@mail.com	654-345-9876	\N	\N	\N	f	2026-03-23 08:38:19.423455-04	2026-03-23 08:38:19.423455-04
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, phone_number, email, password, created_at, updated_at) FROM stdin;
1	Amy Lee	123-654-0926	amy@maily.com	Password	2026-03-23 08:17:50.294016-04	2026-03-23 08:17:50.294016-04
2	Someone Smith	999-999-9900	s.t.smith@mail.com	Password2	2026-03-23 08:17:50.294016-04	2026-03-23 08:17:50.294016-04
\.


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.contacts_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: contacts contacts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict leWk1bYdTLgjuvjKKVrbJRK5jByb2evZYGTOniufVUChmYxP4f8oTP5frHqfABD

