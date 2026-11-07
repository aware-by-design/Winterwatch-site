# Winterwatch website publication

Prepared for aware-by-design. This repository contains only the files delivered by the public website and this deployment note. This publication repository excludes development history, tests, credentials and internal reports. Development-repository access is managed separately. Repository visibility is controlled by its owner.

Publish this repository root through the organisation's approved static website host. GitHub Pages is configured to use main and /(root). There is no install or build command and no application backend. Website visitors can inspect all HTML, CSS, JavaScript, images and lesson content delivered to their browsers.

The calendar has no accounts or analytics. Minimal quest progress and streak counts/dates are saved in the visitor’s browser; they are not uploaded by this application. Browser settings control retention, and the progress panel has a Clear saved progress action. Verify the hosting provider's own visitor logging, cookies, retention and delivered security headers before publication. The _headers file applies only to hosts that support that format; it is not a portable guarantee of response headers.

GitHub Pages records visitors' IP addresses for security purposes, so it does not meet a requirement of no visitor-IP storage: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection

Do not add credentials, development files, source maps, private reports or source-repository history here. Updates should replace only the reviewed publication files.
