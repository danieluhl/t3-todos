import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { supabase } from "~/server/db";

export const todosRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const { data } = await supabase.from("todos").select();
    return data;
  }),
  setChecked: publicProcedure
    .input(z.object({ id: z.number(), checked: z.boolean() }))
    .mutation(async ({ input }) => {
      try {
        const { error } = await supabase
          .from("todos")
          .update({
            checked: input.checked,
            updated_at: new Date().toUTCString(),
          })
          .eq("id", input.id);
        if (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }),
  addTodo: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const { error } = await supabase.from("todos").insert({
          checked: false,
          text: input.text,
          created_at: new Date().toUTCString(),
        });
        if (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }),
  deleteTodo: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      try {
        const { error } = await supabase
          .from("todos")
          .delete()
          .eq("id", input.id);
        if (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }),
});
