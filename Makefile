.PHONY: deps dev
deps:
	(cd ui; yarn install)
	(cd service; venv/bin/pip install -r requirements.txt)
ui:
	(cd ui; yarn start)

api:
	(cd service; venv/bin/flask run)
