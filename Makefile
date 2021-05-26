edit:
	code -n .

e: edit

open:
	open http://localhost:$(PORT)

o: open

start: open
	npm run start

pre-commit:
	@npm run --silent pre-commit

pc: pre-commit

git-hooks:
	cp pre-commit .git/hooks/

test: open-tests
	npm run start

open-tests:
	open http://localhost:$(PORT)/tests.html
