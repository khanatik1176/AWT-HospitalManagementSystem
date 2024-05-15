import { Injectable } from '@nestjs/common';
import { CreateSymptomCheckerDto } from './dto/create-symptom_checker.dto';
import { SymptomChecker } from 'src/entities/symptomChecker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Session} from 'express-session';


@Injectable()
export class SymptomCheckerService {

  constructor(
    @InjectRepository(SymptomChecker)
    private symptomCheckerRepo: Repository<SymptomChecker>
  ) {}

    async createSymptoms(createSymptomCheckerDto: CreateSymptomCheckerDto, session: Session) {

    console.log("Symptoms Stored Successfully");
    
    createSymptomCheckerDto.patient_email = session['email'];
    const symptom_checker_data = await this.symptomCheckerRepo.create(createSymptomCheckerDto);
    return await this.symptomCheckerRepo.save(symptom_checker_data);
    
    }

    async checkSymptoms(symptom_checker_id: number): Promise<string>
    {
      console.log("Symptoms Checked Successfully");
      
      const symptom_checker_data = await this.symptomCheckerRepo.findOne({where:{id:symptom_checker_id}});
      const symptoms_fever = symptom_checker_data.symptoms_1;
      const symptoms_cough = symptom_checker_data.symptoms_2;
      const symptoms_shortness_of_breath = symptom_checker_data.symptoms_3;
      const symptoms_sore_throat = symptom_checker_data.symptoms_4;
      const symptoms_sneezing = symptom_checker_data.symptoms_5;
      const symptoms_chestpain = symptom_checker_data.symptoms_6;
      const symptoms_weightloss = symptom_checker_data.symptoms_7;
      const symptoms_fatigue = symptom_checker_data.symptoms_8;
      const symptoms_headache = symptom_checker_data.symptoms_9;

      let status = "";

      if (symptoms_fever == true && symptoms_cough == true && symptoms_shortness_of_breath == true)
      {
        status = "Covid-19";
      }

      else if (symptoms_fever == true && symptoms_cough == true && symptoms_sore_throat == true)
      {
        status = "Flu";
      }

      else if (symptoms_fever == true && symptoms_cough == true && symptoms_sneezing == true)
      {
        status = "Common Cold";
      }

      else if (symptoms_fever == true && symptoms_cough == true && symptoms_shortness_of_breath == true && symptoms_sore_throat == true)
      {
        status = "Bronchitis";
      }

      else if (symptoms_fever == true && symptoms_cough == true  && symptoms_shortness_of_breath == true && symptoms_sore_throat == true &&  symptoms_sneezing == true)
      {
        status = "Asthma";
      }

      else if (symptoms_fever == true && symptoms_cough == true &&  symptoms_shortness_of_breath == true && symptoms_sore_throat == true && symptoms_sneezing == true && symptoms_chestpain == true)
      {
        status = "Pneumonia";
      }

      else if (symptoms_fever == true  && symptoms_cough == true && symptoms_shortness_of_breath == true && symptoms_sore_throat == true && symptoms_sneezing == true && symptoms_chestpain == true && symptoms_fatigue == true)
      {
        status = "Tuberculosis";
      }

      else if (symptoms_fever == true  && symptoms_cough == true && symptoms_shortness_of_breath == true && symptoms_sore_throat == true && symptoms_sneezing == true && symptoms_chestpain == true && symptoms_fatigue == true && symptoms_weightloss  == true)
      {
        status = "Lung Cancer";
      }

      else if (symptoms_fever == true &&  symptoms_cough == true && symptoms_shortness_of_breath == true && symptoms_sore_throat == true && symptoms_sneezing == true && symptoms_chestpain == true && symptoms_fatigue == true && symptoms_weightloss == true  && symptoms_headache == true)
      {
        status = "Covid-19";
      }

     

    symptom_checker_data.symptom_Status = status;
    await this.symptomCheckerRepo.save(symptom_checker_data);

     return "The predicted symptopm is "+status;

    }
    
    async findByEmail(email: string): Promise<SymptomChecker[]> {
      return await this.symptomCheckerRepo.find({ where: { patient_email: email } });
    }

    async findAll()
    {
      return await this.symptomCheckerRepo.find();
    }
 
  //   async remove(id: number)
  // {
  //   const symptom_Remover = await this.symptomCheckerRepo.findOne({where: {id:id}});

  //   return await this.symptomCheckerRepo.remove(symptom_Remover);
  // }

}
