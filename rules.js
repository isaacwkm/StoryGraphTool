class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data

        if (locationData.Choices.length > 0) { // TODO: check if the location has any Choices
            for (let choice of locationData.Choices) { // TODO: loop over the location's Choices
                if(true) {
                    this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                    // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works

                }
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if (choice) {
            if (this.isUnlocked(choice)){

                this.unlockOthers(choice);
                this.engine.show("&gt; " + choice.Text);
                this.engine.gotoScene(Location, choice.Target);
            }
            else{
                this.engine.show("&gt; " + choice.LockedMessage);
                this.engine.addChoice("Confirm", choice.LockedChoice);
            }

        } else {
            this.engine.gotoScene(End);
        }
    }

    unlockOthers(choice){
        if (choice.Unlocks != null){
           let loc = this.engine.storyData.Locations[choice.Unlocks.In];
           loc.Choices[choice.Unlocks.Target].Locked = false;
        }
    }

    isUnlocked(choice) {
        if (choice.Locked != null) {
            if (choice.Locked == true) {
                return false;
            }
            else {
                return true;
            }
        }
        return true;
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');