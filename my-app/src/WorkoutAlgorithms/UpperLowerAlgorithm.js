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
<<<<<<< HEAD
            if (muscleGroup === 'upper') {
                filteredExcersize = database.filter(excersize => excersize.Warmup === 'push' || excersize.Warmup === 'pull');
                numWarmups = 2
            }
            else {
                filteredExcersize = database.filter(excersize => excersize.Warmup === 'legs');
                numWarmups = 1
            }
            if (filteredExcersize) {


                while (excersizesForDay.length < numWarmups) {

                    let selectedWarmup = selectExcersize(filteredExcersize);
                    selectedWarmup = { 'name': selectedWarmup.Exercise, 'muscle': selectedWarmup.MajorMuscle[0] }

                    while (excersizesForDay.findIndex(activity => activity.name === selectedWarmup.name) !== -1 && excersizesForDay.findIndex(activity => activity.muscle === selectedWarmup.muscle) !== -1) {
                        let selectedWarmup = selectExcersize(filteredExcersize);
                        selectedWarmup = { 'name': selectedWarmup.Exercise, 'muscle': selectedWarmup.MajorMuscle[0] }
                    }
                    excersizesForDay.push(selectedWarmup);
=======

            if (goal === 'buildMuscle' || goal === 'buildStrength') {
                if (muscleGroup === 'upper') {
                    filteredExcersize = database.filter(excersize => excersize.Warmup === 'push' || excersize.Warmup === 'pull');
>>>>>>> 2a943d36ec1481664c028acccd886b90b6667fff
                }

                else {
                    filteredExcersize = database.filter(excersize => excersize.Warmup === 'legs');
                }
            }

            else if (goal === 'loseFat') {
                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Cardio');
            }

            if (filteredExcersize) {
                let selectedWarmup = selectExcersize(filteredExcersize);
                selectedWarmup = { 'name': selectedWarmup.Exercise, 'muscle': selectedWarmup.MajorMuscle, 'reps': warmupReps, 'image': 'IMAGEURL' }
                excersizesForDay.push(selectedWarmup);

            }

        }
    }

    const getCompound = () => {
        //filters to get excerszies of workout day depending on muscleGroup. For example all excersizes considered a 'push' excersize

        if (muscleGroup != 'rest') {

            let numOfCompounds;

            if (goal === 'buildMuscle' || goal === 'buildStrength') {
                if (muscleGroup === 'upper') {
                    filteredExcersize = database.filter(excersize => ((excersize.MajorMuscle === 'Back' || excersize.MajorMuscle === 'Chest' || excersize.MajorMuscle === 'Shoulders') && excersize.Compound === 'yes' && excersize.Warmup === 'no'))

<<<<<<< HEAD
            if (muscleGroup === 'upper') {
                filteredExcersize = database.filter(excersize => (excersize.MajorMuscle.indexOf('Chest') !== -1 || excersize.MajorMuscle.indexOf('Shoulders') !== -1
                    || excersize.MajorMuscle.indexOf('Back') !== -1 && excersize.Compound === 'yes' && excersize.Warmup === 'no'))
                numOfCompounds = 3
            }
            if (muscleGroup === 'lower') {
                filteredExcersize = database.filter(excersize => (excersize.MinorMuscle.indexOf('Quads') !== -1 || excersize.MinorMuscle.indexOf('Glutes') !== -1
                    || excersize.MinorMuscle.indexOf('Calves') || excersize.MinorMuscle.indexOf('Hamstrings') && excersize.Compound === 'yes' && excersize.Warmup === 'no'))
                numOfCompounds = 4
            }
=======
                    numOfCompounds = 3
                }
                else {
                    //HAVE TO ADD COMPPUND AS FILTER
                    filteredExcersize = database.filter(excersize => (excersize.MajorMuscle.indexOf('Legs') !== -1))
>>>>>>> 2a943d36ec1481664c028acccd886b90b6667fff

                    numOfCompounds = 4
                }

<<<<<<< HEAD
                    let selectedCompound = selectExcersize(filteredExcersize)
                    if (muscleGroup === 'lower') {
                        selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MinorMuscle[0] }
                    }
                    else {
                        selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MajorMuscle[0] }
                    }
                    //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                    while (excersizesForDay.findIndex(activity => activity.name === selectedCompound.name) !== -1 && excersizesForDay.findIndex(activity => activity.muscle === selectedCompound.muscle) !== -1) {
                        selectedCompound = selectExcersize(filteredExcersize)
                        console.log('rerun')
                        if (muscleGroup === 'lower') {
                            selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MinorMuscle[0] }
                        }
                        else {
                            selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MajorMuscle[0] }
                        }


=======

                if (filteredExcersize) {
                    //gets two compound excersizes
                    function CompoundGetterLoop() {
                        if (excersizesForDay.length <= numOfCompounds) {

                            let selectedCompound = selectExcersize(filteredExcersize)

                            if (muscleGroup === 'upper') {
                                selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MajorMuscle, 'reps': compoundReps, 'image': 'IMAGEURL' }
                            }
                            else {
                                selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MinorMuscle, 'reps': compoundReps, 'image': 'IMAGEURL' }
                            }
                            //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                            excersizesForDay.push(selectedCompound)

                            if (muscleGroup === 'upper') {
                                filteredExcersize = filteredExcersize.filter(excersize => excersize.MajorMuscle !== selectedCompound.muscle)
                            }
                            else {
                                filteredExcersize = filteredExcersize.filter(excersize => excersize.MinorMuscle !== selectedCompound.muscle)
                            }

                            CompoundGetterLoop()
                        }
>>>>>>> 2a943d36ec1481664c028acccd886b90b6667fff
                    }
                    CompoundGetterLoop()
                }
            }

            else if (goal === 'loseFat') {
                let numOfCompounds = 3;

                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Cardio' && excersize.Compound === 'yes');
                if (filteredExcersize) {
                    //gets two compound excersizes
                    while (excersizesForDay.length <= numOfCompounds) {

                        

                        let selectedCompound = selectExcersize(filteredExcersize)

                        selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MajorMuscle, 'reps': compoundReps, 'image': 'IMAGEURL' }

                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedCompound.name) !== -1) {

                            selectedCompound = selectExcersize(filteredExcersize)
                            selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MajorMuscle, 'reps': compoundReps, 'image': 'IMAGEURL' }
   
                        }

                        excersizesForDay.push(selectedCompound);

                    }
                }

            }

        }
    }



    const getIsolation = () => {



        if (muscleGroup != 'rest') {
<<<<<<< HEAD

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

            filteredExcersize = database.filter(excersize => (excersize.MinorMuscle.indexOf(target) !== -1 && excersize.Compound === 'no' && excersize.Warmup === 'no'))



            if (filteredExcersize) {
                //gets two isolation excersizes
                while (excersizesForDay.length < 5) {
                    let selectedIsolation = selectExcersize(filteredExcersize)
                    //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                    while (excersizesForDay.indexOf(selectedIsolation.Exercise) !== -1) {
                        selectedIsolation = selectExcersize(filteredExcersize)
                    }
                    excersizesForDay.push(selectedIsolation.Exercise)
=======
            if (goal === 'buildMuscle' || goal === 'buildStrength') {
                if (muscleGroup === 'upper') {
                    filteredExcersize = database.filter(excersize => ((excersize.MinorMuscle === 'Bicep' || excersize.MinorMuscle === 'Tricep') && excersize.Compound === 'no' && excersize.Warmup === 'no'))
                }
                else {
                    filteredExcersize = database.filter(excersize => (excersize.MinorMuscle === 'Calves'))
                }





                if (filteredExcersize) {
                    //gets two isolation excersizes
                    function IsolationGetterLoop() {
                        if (excersizesForDay.length < 6) {

                            let selectedIsolation = selectExcersize(filteredExcersize)

                            selectedIsolation = { 'name': selectedIsolation.Exercise, 'muscle': selectedIsolation.MinorMuscle, 'reps': isolationReps, 'image': 'IMAGEURL' }

                            //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                            excersizesForDay.push(selectedIsolation)

                            filteredExcersize = filteredExcersize.filter(excersize => excersize.MinorMuscle !== selectedIsolation.muscle)
                            IsolationGetterLoop()
                        }
                    }
                    IsolationGetterLoop()
>>>>>>> 2a943d36ec1481664c028acccd886b90b6667fff
                }
            }

            else if (goal === 'loseFat') {


                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Cardio');

                if (filteredExcersize) {
                    //gets two compound excersizes
                    while (excersizesForDay.length < 6) {

                        let selectedIsolation = selectExcersize(filteredExcersize)

                        selectedIsolation = { 'name': selectedIsolation.Exercise, 'muscle': selectedIsolation.MajorMuscle, 'reps': isolationReps, 'image': 'IMAGEURL' }

                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedIsolation.name) !== -1) {

                            selectedIsolation = selectExcersize(filteredExcersize)
                            selectedIsolation = { 'name': selectedIsolation.Exercise, 'muscle': selectedIsolation.MajorMuscle, 'reps': isolationReps, 'image': 'IMAGEURL' }
                     
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