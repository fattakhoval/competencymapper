--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

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
-- Name: DevelopmentPlans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DevelopmentPlans" (
    id integer NOT NULL,
    plan text NOT NULL,
    "userId" integer,
    status character varying(50) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."DevelopmentPlans" OWNER TO postgres;

--
-- Name: Feedback; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Feedback" (
    id integer NOT NULL,
    "userId" integer,
    text text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Feedback" OWNER TO postgres;

--
-- Name: TestResults; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TestResults" (
    id integer NOT NULL,
    "userId" integer,
    "testId" integer,
    score integer NOT NULL,
    "completedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."TestResults" OWNER TO postgres;

--
-- Name: Tests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tests" (
    id integer NOT NULL,
    description text NOT NULL,
    questions jsonb NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Tests" OWNER TO postgres;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    email character varying(255),
    password character varying(255)
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: development_plans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.development_plans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.development_plans_id_seq OWNER TO postgres;

--
-- Name: development_plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.development_plans_id_seq OWNED BY public."DevelopmentPlans".id;


--
-- Name: feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedback_id_seq OWNER TO postgres;

--
-- Name: feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.feedback_id_seq OWNED BY public."Feedback".id;


--
-- Name: test_results_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.test_results_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.test_results_id_seq OWNER TO postgres;

--
-- Name: test_results_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.test_results_id_seq OWNED BY public."TestResults".id;


--
-- Name: tests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tests_id_seq OWNER TO postgres;

--
-- Name: tests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tests_id_seq OWNED BY public."Tests".id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public."Users".id;


--
-- Name: DevelopmentPlans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DevelopmentPlans" ALTER COLUMN id SET DEFAULT nextval('public.development_plans_id_seq'::regclass);


--
-- Name: Feedback id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Feedback" ALTER COLUMN id SET DEFAULT nextval('public.feedback_id_seq'::regclass);


--
-- Name: TestResults id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestResults" ALTER COLUMN id SET DEFAULT nextval('public.test_results_id_seq'::regclass);


--
-- Name: Tests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tests" ALTER COLUMN id SET DEFAULT nextval('public.tests_id_seq'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: DevelopmentPlans; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Feedback; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: TestResults; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Tests; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Users" VALUES (1, 'Денис', 'user', '2025-01-21 17:25:54.001', '2025-01-21 17:25:54.001', 'honorxpremium75@gmail.com', '$2b$10$xRnJDGnejD6FCBTNXHzPOejtJ.PsLnJMi3zWC5MQCyJBH0Hhxp5K6');
INSERT INTO public."Users" VALUES (2, 'Максим', 'user', '2025-01-21 19:09:01.116', '2025-01-21 19:09:01.116', 'lakos208@gmail.com', '$2b$10$fr3EpeE1AOO7rET8K/bolOQvvfOEJSbQ/3wqarseH5DdC6h7ad/gO');


--
-- Name: development_plans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.development_plans_id_seq', 1, false);


--
-- Name: feedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.feedback_id_seq', 1, false);


--
-- Name: test_results_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.test_results_id_seq', 1, false);


--
-- Name: tests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tests_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: DevelopmentPlans development_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DevelopmentPlans"
    ADD CONSTRAINT development_plans_pkey PRIMARY KEY (id);


--
-- Name: Feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Feedback"
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (id);


--
-- Name: TestResults test_results_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestResults"
    ADD CONSTRAINT test_results_pkey PRIMARY KEY (id);


--
-- Name: Tests tests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tests"
    ADD CONSTRAINT tests_pkey PRIMARY KEY (id);


--
-- Name: Users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: DevelopmentPlans development_plans_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DevelopmentPlans"
    ADD CONSTRAINT development_plans_user_id_fkey FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Feedback feedback_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Feedback"
    ADD CONSTRAINT feedback_user_id_fkey FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: TestResults test_results_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestResults"
    ADD CONSTRAINT test_results_test_id_fkey FOREIGN KEY ("testId") REFERENCES public."Tests"(id) ON DELETE CASCADE;


--
-- Name: TestResults test_results_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestResults"
    ADD CONSTRAINT test_results_user_id_fkey FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

