import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Contest } from "../../../types/contest";

interface CodingContestState {
  Leetcode: {
    leetcode: Contest[];
    isLoading: boolean;
    isError: boolean;
    isSuccessful: boolean;
    message: string;
  };
  Codechef: {
    codechef: Contest[];
    isLoading: boolean;
    isError: boolean;
    isSuccessful: boolean;
    message: string;
  };
  Codeforces: {
    codeforces: Contest[];
    isLoading: boolean;
    isError: boolean;
    isSuccessful: boolean;
    message: string;
  };
}

const initialState: CodingContestState = {
  Leetcode: {
    leetcode: [],
    isLoading: false,
    isError: false,
    isSuccessful: false,
    message: "",
  },
  Codechef: {
    codechef: [],
    isLoading: false,
    isError: false,
    isSuccessful: false,
    message: "",
  },
  Codeforces: {
    codeforces: [],
    isLoading: false,
    isError: false,
    isSuccessful: false,
    message: "",
  },
};

const Api: any = {
  Leetcode: "https://kontests.net/api/v1/leet_code",
  Codechef: "https://kontests.net/api/v1/code_chef",
  Codeforces: "https://kontests.net/api/v1/codeforces",
};

export const fetchLeeCodeContest = createAsyncThunk<any[], void>(
  "coding/fetchLeeCodeContest",
  async () => {
    console.log("fetching leetcode contest");
    const response = await fetch(Api.Leetcode);
    const data = await response.json();
    return data;
  }
);

export const fetchCodechefContest = createAsyncThunk<any[], void>(
  "coding/fetchCodechefContest",
  async () => {
    console.log("fetching codechef contest");
    const response = await fetch(Api.Codechef);
    const data = await response.json();
    return data;
  }
);

export const fetchCodeforceContest = createAsyncThunk<any[], any>(
  "coding/fetchCodeforceContest",
  async () => {
    console.log("fetching codeforce contest");
    const response = await fetch(Api.Codeforces);
    const data = await response.json();
    return data;
  }
);

export const codingContest = createSlice({
  name: "coding",
  initialState,
  reducers: {
    resetContest: (state) => {
      state.Leetcode = initialState.Leetcode;
      state.Codechef = initialState.Codechef;
      state.Codeforces = initialState.Codeforces;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeeCodeContest.pending, (state) => {
        state.Leetcode.isLoading = true;
      })
      .addCase(fetchLeeCodeContest.fulfilled, (state, action) => {
        state.Leetcode.isLoading = false;
        state.Leetcode.isSuccessful = true;
        state.Leetcode.leetcode = action.payload;
      })
      .addCase(fetchLeeCodeContest.rejected, (state) => {
        state.Leetcode.isLoading = false;
        state.Leetcode.isError = true;
      });
    builder
      .addCase(fetchCodechefContest.pending, (state) => {
        state.Codechef.isLoading = true;
      })
      .addCase(fetchCodechefContest.fulfilled, (state, action) => {
        state.Codechef.isLoading = false;
        state.Codechef.isSuccessful = true;
        state.Codechef.codechef = action.payload;
      })
      .addCase(fetchCodechefContest.rejected, (state) => {
        state.Codechef.isLoading = false;
        state.Codechef.isError = true;
      });
    builder
      .addCase(fetchCodeforceContest.pending, (state) => {
        state.Codeforces.isLoading = true;
      })
      .addCase(fetchCodeforceContest.fulfilled, (state, action) => {
        state.Codeforces.isLoading = false;
        state.Codeforces.isSuccessful = true;
        state.Codeforces.codeforces = action.payload;
      })
      .addCase(fetchCodeforceContest.rejected, (state) => {
        state.Codeforces.isLoading = false;
        state.Codeforces.isError = true;
      });
  },
});

export const { resetContest } = codingContest.actions;
export default codingContest.reducer;
