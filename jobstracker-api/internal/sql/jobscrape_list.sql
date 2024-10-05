CREATE TABLE public.jobscrape_list (
    id SERIAL PRIMARY KEY,
    jobname TEXT NOT NULL, UNIQUE(jobname),
    getjobsCount boolean DEFAULT false,
    getjobsDetails boolean DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO public.jobscrape_list (jobname, getjobsCount, getjobsDetails)
VALUES
    ('job1', true, false),
    ('job2', false, true),
    ('job3', false, false),
    ('job4', true, true),
    ('job5', false, true);