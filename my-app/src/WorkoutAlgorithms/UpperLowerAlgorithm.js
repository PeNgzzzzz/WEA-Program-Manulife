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
                    filteredExcersize = database.filter(excersize => excersize.Warmup === 'push' || excersize.Warmup === 'pull');
                }

                else {
                    filteredExcersize = database.filter(excersize => excersize.Warmup === 'legs');
                }
            }

            else if (goal === 'loseFat') {
                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Cardio');
            }

            else{
                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Yoga' || excersize.ExerciseType === 'Plyo');

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

                    numOfCompounds = 3
                }
                else {
                    //HAVE TO ADD COMPPUND AS FILTER
                    filteredExcersize = database.filter(excersize => (excersize.MajorMuscle === 'Legs' && excersize.MinorMuscle !== 'Calves'))

                    numOfCompounds = 4
                }


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

            else{
                let numOfCompounds = 3;
                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Yoga' || excersize.ExerciseType === 'Plyo');
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
            else{
             

                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Yoga' || excersize.ExerciseType === 'Plyo');
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