const object = require('@hapi/joi/lib/types/object');
const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    idNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    batch: {
        type: Number,
        required: true
    },
    yearofStudy: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hardSkills: {
        type: Object,
        default: [
            {
                programmingLanguages: {
                    type: Object,
                    default: {
                        java: "beginner",
                        c: "beginner",
                        cpp: "beginner",
                        python: "beginner",
                    }
                },
            },
            {
                subjects: {
                    type: Obje,
                    default: {
                        OS: {
                            type: Object,
                            default: {
                                topics: "",
                                level: "beginner"
                            }
                        },
                        CN: {
                            type: Object,
                            default: {
                                topics: "",
                                level: "beginner"
                            }
                        },
                        CD: {
                            type: Object,
                            default: {
                                topics: "",
                                level: "beginner"
                            }
                        },
                        DM: {
                            type: Object,
                            default: {
                                topics: "",
                                level: "beginner"
                            }
                        },
                    }
                }
            },
            {
                technologies: {
                    type: Object,
                    default: {
                        WebDev: {
                            type: Object,
                            default: {
                                tools: [],
                                level: "beginner"
                            }
                        },
                        MobileDev: {
                            type: Object,
                            default: {
                                tools: [],
                                level: "beginner"
                            }
                        },
                        DataScience: {
                            type: Object,
                            default: {
                                tools: [],
                                level: "beginner"
                            }
                        }
                    }
                }
            }
        ]
    },
    softSkills: {
        type: Object,
        default: [
            {
                languages: {
                    type: Object,
                    default: {
                        english: {
                            type: Object,
                            default: {
                                reading: "beginner",
                                writing: "beginner",
                                speaking: "beginner"
                            }
                        },
                        telugu: {
                            type: Object,
                            default: {
                                reading: "beginner",
                                writing: "beginner",
                                speaking: "beginner"
                            }
                        },
                        hindi: {
                            type: Object,
                            default: {
                                reading: "beginner",
                                writing: "beginner",
                                speaking: "beginner"
                            }
                        },
                    }
                }
            },
            {
                decisonmaking: "beginner",
            },
            {
                leadershipSKills: "beginner",
            },
            {
                problemSolvingSkills: "beginner",
            }
        ]
    },
    schooling: {
        type: Object,
        default: {
            name: "",
            cgpa: "",
            loc: "",
            passout: "",
        }
    },
    preGraduation: {
        type: Object,
        default: {
            name: "",
            cgpa: "",
            loc: "",
            passout: "",
        }
    },
    graduation: {
        type: Object,
        default: {
            name: "",
            cgpa: "",
            passout: "",
            loc: "",
        }
    },
    links: {
        type: Array,
        default: []
    }
},
    { collection: 'students', timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);