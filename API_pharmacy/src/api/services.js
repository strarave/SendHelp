const patients = [
  "veronica",
  "XYZ",
  "vanessa",
  "luisa",
  "roberta",
  "chiara",
];

isRegistered = (patient) => {
  let index = patients.findIndex((p) => p == patient)
  return index != -1;
}

module.exports.getPatient = async (patient) => {
  if (!isRegistered(patient))
    return {
      status: 404,
      data: `Patient '${patient}' not found`
    };

  return {
    status: 200,
    data: `Patient '${patient}' is registered`
  }
}


module.exports.addPatient = async (body) => {
  let nickname = body.nickname;

  if (isRegistered(nickname))
    return {
      status: 400,
      data: `Patient '${nickname}' already registered`
    };

  patients.push(nickname);
  return {
    status: 200,
    data: `Patient '${nickname}' successfully registered`
  };
};

therapyCounter = 0;
class Therapy {
  constructor(oncologist, patient, drug, dosage, comment, id = null) {
    if (id == null) {
      this.id = therapyCounter;
      therapyCounter++;
    }
    else this.id = id;

    this.oncologist = oncologist;
    this.patient = patient;
    this.drug = drug;
    this.dosage = dosage;
    this.comment = comment;
  }

  toString() {
    return `{\n\tid: ${this.id}\n\toncologist: ${this.oncologist}\n\tpatient: ${this.patient}\n\tdrug: ${this.drug}\n\tdosage: ${this.dosage}\n\tcomment: ${this.comment}`
  }
}

const therapies = [
  new Therapy("Gianni", "Veronica", "Tamoxifene", "2 mg", null),
  new Therapy("Gianni", "Vanessa", "Anastrozolo", "10 mg", null),
  new Therapy("Gianni", "Luisa", "Verzenios", "2 mg", null),
  new Therapy("Valentina", "Roberta", "Verzenios", "50 mg", null),
  new Therapy("Valentina", "Chiara", "Exemestane", "100 mg", null),
]

module.exports.getTherapies = async () => {
  return {
    status: 200,
    data: therapies
  }
}

module.exports.addTherapy = async (body) => {
  let oncologist = body.oncologist;
  let patient = body.patient;
  let drug = body.drug;
  let dosage = body.dosage;
  let comment = body.comment;

  if (!isRegistered(patient))
    return {
      status: 400,
      data: `Patient '${patient}' is not registered`
    }

  let therapy = new Therapy(oncologist, patient, drug, dosage, comment);
  therapies.push(therapy);

  return {
    status: 201,
    data: `Therapy successfully added`
  };
};

module.exports.updateTherapy = async (therapyId, body) => {
  let id = body.id;
  let oncologist = body.oncologist;
  let patient = body.patient;
  let drug = body.drug;
  let dosage = body.dosage;
  let comment = body.comment;

  let index = therapies.findIndex((therapy) => therapy.id == therapyId);
  if (index == -1)
    return {
      status: 404,
      data: `Therapy ${therapyId} not found`
    };

  let therapy = new Therapy(oncologist, patient, drug, dosage, comment, id);
  therapies.splice(index, 1);
  therapies.push(therapy);

  return {
    status: 200,
    data: `Therapy ${therapyId} successfully updated`
  };
};

module.exports.deleteTherapy = async (therapyId) => {
  let index = therapies.findIndex((therapy) => therapy.id == therapyId);
  if (index == -1)
    return {
      status: 404,
      data: `Therapy ${therapyId} not found`
    };

  therapies.splice(index, 1);
  return {
    status: 200,
    data: `Therapy ${therapyId} successfully removed`
  };
};