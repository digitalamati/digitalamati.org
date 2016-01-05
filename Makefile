MD-SOURCE := $(patsubst %.md,%.md.html,$(wildcard md/*.md))

all:

# This generic rule accepts PDF targets with corresponding Markdown 
# source, and makes them using pandoc
%.md.html : %.md
	@pandoc $< -o html/$(basename $(basename $(notdir $@))).html

markdown: $(MD-SOURCE)

build: markdown index.erb
	erb index.erb > index.html

