




const selectExcersize = (arr) => {
    return arr[(Math.floor(Math.random() * arr.length))]
}


const PushPullAlgorithm = (database, muscleGroup, goal, warmupReps, compoundReps, isolationReps) => {


    //array represents the excersizes performed
    let excersizesForDay = []
    let filteredExcersize



    //gets warmup 

    const GetWarmUp = () => {

        if (muscleGroup != 'rest') {

            if (goal === 'buildMuscle' || goal === 'buildStrength') {
                filteredExcersize = database.filter(excersize => excersize.fields.Warmup === muscleGroup);
            }
            else if (goal === 'loseFat') {
                filteredExcersize = database.filter(excersize => excersize.fields.ExerciseType[0] === 'Cardio');
            }

            if (filteredExcersize) {
                let selectedWarmup = selectExcersize(filteredExcersize);
                selectedWarmup = { 'name': selectedWarmup.fields.Exercise, 'muscle': selectedWarmup.fields.MajorMuscle[0], 'reps': warmupReps, 'image': 'IMAGEURL' }
                excersizesForDay.push(selectedWarmup);
            }
        }
    }

    const getCompound = () => {
        //filters to get excerszies of workout day depending on muscleGroup. For example all excersizes considered a 'push' excersize

        if (muscleGroup != 'rest') {
            if (goal === 'buildMuscle' || goal === 'buildStrength') {
                let target;
                let numOfCompounds = 2;


                if (muscleGroup === 'pull') {
                    target = 'Back';
                }
                if (muscleGroup === 'push') {
                    target = 'Chest';
                }
                if (muscleGroup === 'legs') {
                    target = 'Legs';
                }


                if (muscleGroup === 'push') {
                    filteredExcersize = database.filter(excersize => (excersize.fields.MajorMuscle.indexOf(target) !== -1 || excersize.fields.MajorMuscle.indexOf('Shoulders') !== -1 && excersize.fields.Compound === 'yes' && excersize.fields.Warmup === 'no'))
                    numOfCompounds = 3
                }
                else {
                    filteredExcersize = database.filter(excersize => (excersize.fields.MajorMuscle.indexOf(target) !== -1 && excersize.fields.Compound === 'yes' && excersize.fields.Warmup === 'no'))
                }

                if (filteredExcersize) {
                    //gets two compound excersizes
                    while (excersizesForDay.length <= numOfCompounds) {

                        let selectedCompound = selectExcersize(filteredExcersize)
                        selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MinorMuscle[0], 'reps': compoundReps, 'image': 'IMAGEURL' }

                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedCompound.name) !== -1 || excersizesForDay.findIndex(activity => activity.muscle === selectedCompound.muscle) !== -1) {

                            selectedCompound = selectExcersize(filteredExcersize)
                            selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MinorMuscle[0], 'reps': compoundReps, 'image': 'IMAGEURL' }

                        }
                        excersizesForDay.push(selectedCompound)

                    }
                }
            }
            
            else if (goal === 'loseFat') {

                let numOfCompounds = 3;

                filteredExcersize = database.filter(excersize => excersize.fields.ExerciseType[0] === 'Cardio' && excersize.fields.Compound === 'yes');

                if (filteredExcersize) {
                    //gets two compound excersizes
                    while (excersizesForDay.length <= numOfCompounds) {

                        let selectedCompound = selectExcersize(filteredExcersize)

                        selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MajorMuscle[0], 'reps': compoundReps, 'image': 'IMAGEURL' }

                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedCompound.name) !== -1) {

                            selectedCompound = selectExcersize(filteredExcersize)
                            selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MajorMuscle[0], 'reps': compoundReps, 'image': 'IMAGEURL' }

                        }

                        excersizesForDay.push(selectedCompound);

                    }
                }
            }

        }
    }

    const getIsolation = () => {



        if (muscleGroup != 'rest') {

            if (goal === 'buildMuscle' || goal === 'buildStrength') {
                let target;
                if (muscleGroup === 'pull') {
                    target = 'Bicep';
                }
                if (muscleGroup === 'push') {
                    target = 'Tricep';
                }
                if (muscleGroup === 'legs') {
                    target = 'Glutes';
                }

                filteredExcersize = database.filter(excersize => (excersize.fields.MinorMuscle.indexOf(target) !== -1 && excersize.fields.Compound === 'no' && excersize.fields.Warmup === 'no'))



                if (filteredExcersize) {
                    //gets two isolation excersizes
                    while (excersizesForDay.length < 5) {
                        let selectedIsolation = selectExcersize(filteredExcersize)
                        selectedIsolation = { 'name': selectedIsolation.fields.Exercise, 'muscle': selectedIsolation.fields.MinorMuscle[0], 'reps': isolationReps, 'image': 'IMAGEURL' }

                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedIsolation.name) !== -1) {
                            selectedIsolation = selectExcersize(filteredExcersize)
                            selectedIsolation = { 'name': selectedIsolation.fields.Exercise, 'muscle': selectedIsolation.fields.MinorMuscle[0], 'reps': isolationReps, 'image': 'IMAGEURL' }

                        }
                        excersizesForDay.push(selectedIsolation)
                    }
                }
            }

            else if (goal === 'loseFat') {


                filteredExcersize = database.filter(excersize => excersize.fields.ExerciseType[0] === 'Cardio');

                if (filteredExcersize) {
                    //gets two compound excersizes
                    while (excersizesForDay.length < 6) {

                        let selectedIsolation = selectExcersize(filteredExcersize)
                        selectedIsolation = { 'name': selectedIsolation.fields.Exercise, 'muscle': selectedIsolation.fields.MajorMuscle[0], 'reps': isolationReps, 'image': 'IMAGEURL' }

                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedIsolation.name) !== -1) {
                            selectedIsolation = selectExcersize(filteredExcersize)
                            selectedIsolation = { 'name': selectedIsolation.fields.Exercise, 'muscle': selectedIsolation.fields.MajorMuscle[0], 'reps': isolationReps, 'image': 'IMAGEURL' }

                        }

                        excersizesForDay.push(selectedIsolation);

                    }
                }
            }

        }

    }

    GetWarmUp()
    getCompound()
    getIsolation()
    return (excersizesForDay)
}


export default PushPullAlgorithm