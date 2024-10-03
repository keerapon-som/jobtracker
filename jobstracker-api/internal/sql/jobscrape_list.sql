CREATE TABLE public.jobscrape_list (
    id SERIAL PRIMARY KEY,
    jobname TEXT NOT NULL, UNIQUE(jobname),
    getjobsCount boolean DEFAULT false,
    getjobsDetails boolean DEFAULT false,
    getjobsSuperDetails boolean DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO public.jobscrape_list (jobname, getjobsCount, getjobsDetails, getjobsSuperDetails)
VALUES
    ('job1', true, false, false),
    ('job2', false, true, false),
    ('job3', false, false, true),
    ('job4', true, true, false),
    ('job5', false, true, true);