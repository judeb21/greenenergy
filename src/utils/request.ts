import axiosInstance from "@/services/axios";
import { Commit as VuexCommit } from "vuex";

const genericRequest = async (
  commit: VuexCommit,
  actionTypes: Array<string>,
  axiosConfig: object
) => {
  commit(actionTypes[0]);
  try {
    const response = await axiosInstance(axiosConfig);
    commit(actionTypes[1], response.data.data || response.data);
    return response;
  } catch (error) {
    commit(actionTypes[2], error);
    return error;
  }
};

// Function to make GET requests
export const generalGetRequest = (
  commit: VuexCommit,
  url: string,
  actions: Array<string>
) =>
  genericRequest(commit, actions, {
    method: "GET",
    url,
  });

// Function to make POST requests
export const generalPostRequest = (
  commit: VuexCommit,
  url: string,
  actions: Array<string>,
  request: object
) =>
  genericRequest(commit, actions, {
    method: "POST",
    url,
    data: request,
  });
