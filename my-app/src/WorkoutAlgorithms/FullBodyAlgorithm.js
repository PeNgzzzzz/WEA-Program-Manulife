const selectExcersize = (arr) => {
    return arr[(Math.floor(Math.random() * arr.length))]
}


const FullbodyAlgorithm = (database, muscleGroup, goal, warmupReps, compoundReps, isolationReps) => {


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
            else{
                filteredExcersize = database.filter(excersize => excersize.fields.ExerciseType[0] === 'Yoga');
            }


            if (filteredExcersize) {
                let selectedWarmup = selectExcersize(filteredExcersize);
                selectedWarmup = { 'name': selectedWarmup.fields.Exercise, 'muscle': 'warmup', 'reps': warmupReps, 'image': 'IMAGEURL' }
                excersizesForDay.push(selectedWarmup);
            }
        }
    }

    const getCompound = () => {
        //filters to get excerszies of workout day depending on muscleGroup. For example all excersizes considered a 'push' excersize

        let numOfCompounds;

        if (muscleGroup != 'rest') {



            if (goal === 'buildMuscle' || goal === 'buildStrength') {

                numOfCompounds = 3

                filteredExcersize = database.filter(excersize => ((excersize.fields.MajorMuscle.indexOf('Full Body') !== -1 || excersize.fields.MajorMuscle.indexOf('Chest') !== -1
                    || excersize.fields.MajorMuscle.indexOf('Back') !== -1 || excersize.fields.MajorMuscle.indexOf('Legs') !== -1
                    || excersize.fields.MajorMuscle.indexOf('Shoulders') !== -1) && excersize.fields.Compound === 'yes' && excersize.fields.Warmup === 'no'))

                if (filteredExcersize) {
                    //gets two compound excersizes
                    while (excersizesForDay.length <= numOfCompounds) {

                        let selectedCompound = selectExcersize(filteredExcersize)
                        selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MajorMuscle[0], 'reps': compoundReps, 'image': 'IMAGEURL' }

                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedCompound.name) !== -1 || excersizesForDay.findIndex(activity => activity.muscle === selectedCompound.muscle) !== -1) {
                            selectedCompound = selectExcersize(filteredExcersize)
                            selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MajorMuscle[0], 'reps': compoundReps, 'image': 'IMAGEURL' }

                        }

                        excersizesForDay.push(selectedCompound);

                    }
                }
            }

            else if (goal === 'loseFat') {

                numOfCompounds = 4;

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
            else{

                numOfCompounds = 5;

                filteredExcersize = database.filter(excersize => excersize.fields.ExerciseType[0] === 'Yoga');
                console.log(filteredExcersize)
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
                filteredExcersize = database.filter(excersize => ((excersize.fields.MinorMuscle.indexOf('Bicep') !== -1 || excersize.fields.MinorMuscle.indexOf('Tricep') !== -1)
                    || excersize.fields.MajorMuscle.indexOf('Core') !== -1) && excersize.fields.Compound === 'no' && excersize.fields.Warmup === 'no')



                if (filteredExcersize) {
                    //gets two isolation excersizes
                    while (excersizesForDay.length < 6) {
                        let selectedIsolation = selectExcersize(filteredExcersize)
                        selectedIsolation = { 'name': selectedIsolation.fields.Exercise, 'muscle': selectedIsolation.fields.MajorMuscle[0], 'reps': isolationReps, 'image': 'IMAGEURL' }
                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedIsolation.name) !== -1 || excersizesForDay.findIndex(activity => activity.muscle === selectedIsolation.muscle) !== -1) {
                            selectedIsolation = selectExcersize(filteredExcersize)
                            selectedIsolation = { 'name': selectedIsolation.fields.Exercise, 'muscle': selectedIsolation.fields.MajorMuscle[0], 'reps': isolationReps, 'image': 'IMAGEURL' }
                        }
                        excersizesForDay.push(selectedIsolation);
                    }
                }
            }
            else if (goal === 'loseFat') {

                filteredExcersize = database.filter(excersize => excersize.fields.ExerciseType[0] === 'Cardio' && excersize.fields.Compound === 'no');

                if (filteredExcersize) {
                    //gets two isolation excersizes
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

            else{
                filteredExcersize = database.filter(excersize => excersize.fields.ExerciseType[0] === 'Cardio' && excersize.fields.Compound === 'yes');

                if (filteredExcersize) {
                    //gets two isolation excersizes
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


export default FullbodyAlgorithm