import {createService} from "./roller-service";
import RollerFactory from "roller/lib/rollers/roller-factory";
import TextExtractor from "roller/lib/rollers/text-extractor/text-extractor";
import * as configuration from "./configuration";

const rollerFactory = new RollerFactory(new TextExtractor());

const service = createService(rollerFactory.createElasticsearchRoller(configuration["DEV"].elasticsearch, configuration["DEV"].storeConfiguration));
service.start();