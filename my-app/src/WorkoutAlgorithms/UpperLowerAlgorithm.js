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
                if (muscleGroup === 'upper') {
                    filteredExcersize = database.filter(excersize => excersize.fields.Warmup === 'push' || excersize.fields.Warmup === 'pull');
                }

                else {
                    filteredExcersize = database.filter(excersize => excersize.fields.Warmup === 'legs');
                }
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

            let numOfCompounds;

            if (goal === 'buildMuscle' || goal === 'buildStrength') {
                if (muscleGroup === 'upper') {
                    filteredExcersize = database.filter(excersize => ((excersize.fields.MajorMuscle.indexOf('Back') !== -1 || excersize.fields.MajorMuscle.indexOf('Chest') !== -1 || excersize.fields.MajorMuscle.indexOf('Shoulders') !== -1) && excersize.fields.Compound === 'yes' && excersize.fields.Warmup === 'no'))

                    numOfCompounds = 3
                }
                else {
                    //HAVE TO ADD COMPPUND AS FILTER
                    filteredExcersize = database.filter(excersize => (excersize.fields.MajorMuscle.indexOf('Legs') !== -1))

                    numOfCompounds = 4
                }


                if (filteredExcersize) {
                    //gets two compound excersizes
                    function CompoundGetterLoop() {
                        if (excersizesForDay.length <= numOfCompounds) {

                            let selectedCompound = selectExcersize(filteredExcersize)

                            if (muscleGroup === 'upper') {
                                selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MajorMuscle[0], 'reps': compoundReps, 'image': 'IMAGEURL' }
                            }
                            else {
                                selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MinorMuscle[0], 'reps': compoundReps, 'image': 'IMAGEURL' }
                            }
                            //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                            excersizesForDay.push(selectedCompound)

                            if (muscleGroup === 'upper') {
                                filteredExcersize = filteredExcersize.filter(excersize => excersize.fields.MajorMuscle[0] !== selectedCompound.muscle)
                            }
                            else {
                                filteredExcersize = filteredExcersize.filter(excersize => excersize.fields.MinorMuscle[0] !== selectedCompound.muscle)
                            }

                            CompoundGetterLoop()
                        }
                    }
                    CompoundGetterLoop()
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
                if (muscleGroup === 'upper') {
                    filteredExcersize = database.filter(excersize => ((excersize.fields.MinorMuscle.indexOf('Bicep') !== -1 || excersize.fields.MinorMuscle.indexOf('Tricep') !== -1) && excersize.fields.Compound === 'no' && excersize.fields.Warmup === 'no'))
                }
                else {
                    filteredExcersize = database.filter(excersize => (excersize.fields.MinorMuscle.indexOf('Calves') !== -1))
                }





                if (filteredExcersize) {
                    //gets two isolation excersizes
                    function IsolationGetterLoop() {
                        if (excersizesForDay.length < 6) {

                            let selectedIsolation = selectExcersize(filteredExcersize)

                            selectedIsolation = { 'name': selectedIsolation.fields.Exercise, 'muscle': selectedIsolation.fields.MinorMuscle[0], 'reps': isolationReps, 'image': 'IMAGEURL' }

                            //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                            excersizesForDay.push(selectedIsolation)

                            filteredExcersize = filteredExcersize.filter(excersize => excersize.fields.MinorMuscle[0] !== selectedIsolation.muscle)
                            IsolationGetterLoop()
                        }
                    }
                    IsolationGetterLoop()
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